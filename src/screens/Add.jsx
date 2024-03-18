import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { List, Searchbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  primaryColor,
  secondaryColor,
  textColor,
} from "../components/styles/global";
import axios from "axios";
import WordList from "../components/WordList";
import Loading from "../components/Loading";
import WordItem from "../components/WordItem";
import { useBackHandler } from "@react-native-community/hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Add = ({}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [words, setWords] = useState([]);
  const [itemMode, setItemMode] = useState(false);
  const [wordItem, setWordItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [listModeAdd, setListModeAdd] = useState(true);
  const [indexWord, setIndexWord] = useState(0);
  const [historyMode, setHistoryMode] = useState(true);
  const [massage, setMassage] = useState("start");
  const [history, setHistory] = useState([]);
  const isFocused = useIsFocused();

  const getHistory = async () => {
    setHistory(JSON.parse(await AsyncStorage.getItem("history")));
  };

  useBackHandler(async () => {
    if (itemMode) {
      setListModeAdd(true);
      setItemMode(false);
      await getHistory();
      return true;
    }
    // let the default thing happen
    return false;
  });

  useEffect(() => {
    getHistory();
  }, [isFocused]);

  const handleSearch = async (searchQuery) => {
    setHistoryMode(false);

    try {
      if (searchQuery !== "") {
        setLoading(true);
        const res = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${searchQuery.toLowerCase()}`
        );
        if (res.data) {
          setListModeAdd(true);
          setLoading(false);
          setWords(res.data);
          setMassage("success");
        }
      }
    } catch (error) {
      console.log(error);
      setMassage("fail");
      setLoading(false);
    }
  };

  const handleClear = async () => {
    setListModeAdd(true);
    setItemMode(false);
    setWords([]);
    setHistoryMode(true);
    setMassage("start");
    await getHistory();
  };

  const handleHistory = async (searchQuery) => {
    let history = JSON.parse(await AsyncStorage.getItem("history")) || [];
    history = history.filter((item) => item !== searchQuery);

    while (history.length >= 10) {
      history.pop();
    }

    history.unshift(searchQuery);
    if (history) {
      await AsyncStorage.setItem("history", JSON.stringify(history));
    }
  };

  const handleSearchWithHistory = async (h) => {
    setSearchQuery(h);
    setHistoryMode(false);
    await handleSearch(h);
    await handleHistory(h);
  };

  const handleHistoryDelete = async (h) => {
    let history = JSON.parse(await AsyncStorage.getItem("history")) || [];
    history = history.filter((item) => item !== h);

    if (history) {
      await AsyncStorage.setItem("history", JSON.stringify(history));
    }
    await getHistory();
  };

  return (
    <Container width={windowWidth} height={windowHeight}>
      <ScrollView showsHorizontalScrollIndicator={true}>
        <View>
          <Searchbar
            placeholder="Từ vựng hôm nay..."
            value={searchQuery}
            onChangeText={(query) => {
              setSearchQuery(query);
              setItemMode(false);
            }}
            mode="bar"
            selectionColor={primaryColor}
            outlineStyle={{
              borderColor: "#00CCFF",
              borderRadius: 10,
            }}
            textColor="#7a7a7a"
            style={{
              width: windowWidth * 0.9,
              backgroundColor: "#FFFFFF",
            }}
            returnKeyType="search"
            onSubmitEditing={() => {
              handleSearch(searchQuery);
              handleHistory(searchQuery);
            }}
            onClearIconPress={handleClear}
          />

          {historyMode && (
            <>
              {history?.length !== 0 && (
                <View>
                  <Text
                    variant="titleMedium"
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                  >
                    Lịch sử tìm kiếm:
                  </Text>

                  <View
                    style={{
                      backgroundColor: "white",
                      borderRadius: 10,
                    }}
                  >
                    {history?.map((h, index) => (
                      <View key={index}>
                        <List.Item
                          title={h}
                          style={{
                            color: textColor,
                          }}
                          onPress={() => {
                            handleSearchWithHistory(h);
                          }}
                          right={(prop) => (
                            <TouchableOpacity
                              onPress={() => handleHistoryDelete(h)}
                              style={{
                                // padding: 10,
                                width: 40,
                                height: 30,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Text style={{ color: secondaryColor }}>Xoá</Text>
                            </TouchableOpacity>
                          )}
                        />
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </>
          )}
        </View>

        {loading ? (
          <Loading />
        ) : (
          <>
            {listModeAdd && (
              <>
                {massage === "success" || massage === "start" ? (
                  <WordList
                    setIndexWord={setIndexWord}
                    words={words}
                    setListModeAdd={setListModeAdd}
                    setWordItem={setWordItem}
                    setItemMode={setItemMode}
                  />
                ) : (
                  <View
                    style={{
                      height: windowHeight - 100,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name="reload" size={80} color="black" />
                    <Text
                      variant="titleLarge"
                      style={{ color: textColor, fontWeight: "bold" }}
                    >
                      Không tìm được từ
                    </Text>
                    <Text
                      variant="titleLarge"
                      style={{ color: textColor, fontWeight: "bold" }}
                    >
                      Ấn vào đây để thử lại
                    </Text>
                  </View>
                )}
              </>
            )}
          </>
        )}

        {itemMode && (
          <WordItem
            wordItem={wordItem}
            indexWord={indexWord}
            screenMode={"Add"}
          />
        )}
      </ScrollView>
    </Container>
  );
};

export default Add;

const styles = StyleSheet.create({});
