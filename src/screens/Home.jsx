import {
  Dimensions,
  StyleSheet,
  View,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
// import { Text } from "react-native-paper";
import video from "../../assets/home.mp4";
import { Video, ResizeMode } from "expo-av";

import { FontAwesome5 } from "@expo/vector-icons";

import { Container, secondaryColor } from "../components/styles/global";
import { List, Text } from "react-native-paper";
import { useBackHandler } from "@react-native-community/hooks";
import Loading from "../components/Loading";
import axios from "axios";
import WordItem from "../components/WordItem";
import { useIsFocused } from "@react-navigation/native";
import { readFrequentWord, readWord, updateRead } from "../controller/tree";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Home = () => {
  const [playing, setPlaying] = useState(false);
  const refVideo = useRef(null);
  const [listModeHome, setListModeHome] = useState(true);
  const [loading, setLoading] = useState(false);
  const [word, setWord] = useState({});
  const [words, setWords] = useState([]);
  const [indexWord, setIndexWord] = useState(0);

  const isFocused = useIsFocused();

  useBackHandler(() => {
    if (!listModeHome) {
      setListModeHome(true);
      return true;
    }
    // let the default thing happen
    return false;
  });

  useEffect(() => {
    const getWord = async () => {
      setWords(await readFrequentWord());
    };

    getWord();
  }, [isFocused]);

  const handleSetWordItem = (word, index) => {
    setListModeHome(false);
    setWord(word);
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
      <ScrollView>
        {listModeHome && (
          <View
            style={{
              backgroundColor: "white",
              width: windowWidth * 0.9,
              paddingTop: 10,
              borderRadius: 10,
            }}
          >
            <Video
              ref={refVideo}
              source={video}
              style={{
                width: windowWidth * 0.9,
                height: 400,
                resizeMode: "contain",
              }}
              useNativeControls={false}
              shouldPlay={true}
              autoPlay
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              onPlaybackStatusUpdate={(status) => setPlaying(() => status)}
            />
          </View>
        )}

        {listModeHome ? (
          <View
            style={{
              textAlign: "left",
              width: windowWidth * 0.9,
              marginTop: 60,
            }}
          >
            <View
              style={{
                height: 1,
                width: windowWidth * 0.9,
                backgroundColor: secondaryColor,
              }}
            ></View>
            <Text
              variant="titleLarge"
              style={{ fontWeight: "bold", marginTop: 10 }}
            >
              Từ vựng tra thường xuyên:
            </Text>

            <View>
              {words.length !== 0 &&
                words.map((w, index) => (
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
                    right={(props) => (
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {/* {audioUrl && ( */}
                        {/* <MaterialIcons name="multitrack-audio" size={24} color="black" /> */}
                        {/* )} */}

                        <FontAwesome5
                          name="save"
                          size={24}
                          color="#00CCFF"
                          // onPress={handleWord}
                        />
                      </View>
                    )}
                    onPress={() => handleWord(w)}
                  />
                ))}
            </View>
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
                setListMode={setListModeHome}
              />
            )}
          </View>
        )}
      </ScrollView>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({});
