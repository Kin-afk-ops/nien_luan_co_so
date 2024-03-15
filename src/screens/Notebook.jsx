import { StyleSheet, Text, View, ScrollView, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useBackHandler } from "@react-native-community/hooks";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import {
  Container,
  primaryColor,
  textColor,
} from "../components/styles/global";
import { List } from "react-native-paper";
import axios from "axios";
import WordItem from "../components/WordItem";
import Loading from "../components/Loading";
import { readWord } from "../controller/tree";
import { useIsFocused } from "@react-navigation/native";

const Notebook = () => {
  const [listModeNote, setListModeNote] = useState(true);
  const [word, setWord] = useState({});
  const [loading, setLoading] = useState(false);
  const [words, setWords] = useState([]);
  const [indexWord, setIndexWord] = useState(0);
  const index = 0;

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

  const handleSetWordItem = async (word, index) => {
    try {
      if (word) {
        setListModeNote(false);
        setLoading(true);
        const res = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`
        );
        if (res.data) {
          setLoading(false);
          // setWord(res.data[index]);
          setWord(res.data[index]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container width={windowWidth} height={windowHeight}>
      <ScrollView>
        {listModeNote ? (
          <View>
            {words.length !== 0 &&
              words?.map((w, index) => (
                <List.Item
                  key={index}
                  title={w.data}
                  // description={w.data.phonetic && w.data.phonetic}
                  style={{
                    width: windowWidth * 0.9,
                    backgroundColor: "#fff",
                    marginTop: 10,
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    handleSetWordItem(w.data, w.index);
                    setIndexWord(w.index);
                  }}
                />
              ))}
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
