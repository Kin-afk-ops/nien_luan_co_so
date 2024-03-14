import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import { List } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { addWord, readWord } from "../controller/tree";
const windowWidth = Dimensions.get("window").width;

const WordList = ({
  setIndexWord,
  words,
  setListModeAdd,
  setWordItem,
  setItemMode,
}) => {
  const handleSetWordItem = (word, index) => {
    setListModeAdd(false);
    setWordItem(word);
    setItemMode(true);
    setIndexWord(index);
  };

  return (
    <View>
      {words?.length !== 0 &&
        words?.map((word, index) => (
          <List.Item
            key={index}
            title={word.word}
            description={word.phonetic}
            style={{
              width: windowWidth * 0.9,
              backgroundColor: "#fff",
              marginTop: 10,
              borderRadius: 10,
            }}
            onPress={() => handleSetWordItem(word, index)}
          />
        ))}
    </View>
  );
};

export default WordList;

const styles = StyleSheet.create({});
