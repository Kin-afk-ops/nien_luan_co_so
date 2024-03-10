import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import { List } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
const windowWidth = Dimensions.get("window").width;

const WordList = ({ words, setListModeAdd, setWordItem, setItemMode }) => {
  const handleSetWordItem = (word) => {
    setListModeAdd(false);
    setWordItem(word);
    setItemMode(true);
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
            right={(props) => (
              <View>
                {/* {audioUrl && ( */}
                {/* <MaterialIcons name="multitrack-audio" size={24} color="black" /> */}
                {/* )} */}

                <FontAwesome5 name="save" size={24} color="black" />
              </View>
            )}
            onPress={() => handleSetWordItem(word)}
          />
        ))}
    </View>
  );
};

export default WordList;

const styles = StyleSheet.create({});
