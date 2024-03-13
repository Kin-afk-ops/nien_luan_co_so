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
  const index = 0;

  const isFocused = useIsFocused();

  useEffect(() => {
    const getWords = async () => {
      setWords(await readWord());
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

  const handleSetWordItem = (word) => {
    setListModeNote(false);
    setLoading(true);

    setWord(word);
    setLoading(false);
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
                  title={w.word}
                  description={w.phonetic && w.phonetic}
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
                  onPress={() => handleSetWordItem(w)}
                />
              ))}
          </View>
        ) : (
          <View>{loading ? <Loading /> : <WordItem wordItem={word} />}</View>
        )}
      </ScrollView>
    </Container>
  );
};

export default Notebook;

const styles = StyleSheet.create({
  container: {},
});
