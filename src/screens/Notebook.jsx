import { StyleSheet, View, ScrollView, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useBackHandler } from "@react-native-community/hooks";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import {
  Container,
  primaryColor,
  textColor,
} from "../components/styles/global";
import { List, Searchbar, Text } from "react-native-paper";
import axios from "axios";
import WordItem from "../components/WordItem";
import Loading from "../components/Loading";
import { readWord, searchWord, updateRead } from "../controller/tree";
import { useIsFocused } from "@react-navigation/native";

const Notebook = () => {
  const [listModeNote, setListModeNote] = useState(true);
  const [word, setWord] = useState({});
  const [loading, setLoading] = useState(false);
  const [words, setWords] = useState([]);
  const [indexWord, setIndexWord] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const isFocused = useIsFocused();

  useEffect(() => {
    const getWords = async () => {
      setWords(await readWord());
      // await readWord();
    };

    getWords();
  }, [isFocused]);

  useBackHandler(() => {
    if (!listModeNote) {
      setListModeNote(true);
      return true;
    }
    // let the default thing happen
    return false;
  });

  const handleSetWordItem = (word, index) => {
    setListModeNote(false);
    setWord(word);
  };

  const handleSearch = async () => {
    try {
      setWords(await searchWord(searchQuery.toLowerCase()));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = async () => {
    setWords(await readWord());
  };

  const handleWord = async (w) => {
    handleSetWordItem(w.data, w.index);
    setIndexWord(w.index);
    await updateRead({
      word: w.data.word,
      index: w.index,
    });
  };

  return (
    <Container width={windowWidth} height={windowHeight}>
      <Searchbar
        placeholder="Tìm từ vựng của bạn..."
        value={searchQuery}
        onChangeText={(query) => {
          setSearchQuery(query);
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
        onSubmitEditing={handleSearch}
        onClearIconPress={handleClear}
      />

      <ScrollView>
        {listModeNote ? (
          <View>
            {words?.length !== 0 ? (
              words?.map((w, index) => (
                <List.Item
                  key={index}
                  title={w.data.word}
                  description={w.data.phonetic && w.data.phonetic}
                  style={{
                    width: windowWidth * 0.9,
                    backgroundColor: "#fff",
                    marginTop: 10,
                    borderRadius: 10,
                  }}
                  onPress={() => handleWord(w)}
                />
              ))
            ) : (
              <View
                style={{
                  width: windowWidth,
                  height: windowHeight,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Entypo name="open-book" size={100} color={textColor} />
                <Text
                  style={{
                    color: textColor,
                    fontWeight: "bold",
                  }}
                  variant="titleLarge"
                >
                  Chưa có từ vựng trong sổ tay
                </Text>
                <Text
                  style={{
                    color: textColor,
                    fontWeight: "bold",
                  }}
                  variant="titleLarge"
                >
                  Hãy thử thêm một từ vựng nào!
                </Text>

                <Text variant="headlineLarge">💪</Text>
              </View>
            )}
          </View>
        ) : (
          <View>
            {loading ? (
              <Loading />
            ) : (
              <WordItem
                wordItem={word}
                indexWord={indexWord}
                screenMode={"NodeBook"}
                setWords={setWords}
                setListMode={setListModeNote}
              />
            )}
          </View>
        )}
      </ScrollView>
    </Container>
  );
};

export default Notebook;

const styles = StyleSheet.create({
  container: {},
});
