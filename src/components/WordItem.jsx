import { BackHandler, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { primaryColor, textColor, textHeaderColor } from "./styles/global";
import WordMeaning from "./WordMeaning";
import { MaterialIcons } from "@expo/vector-icons";
import { addWord, deleteWord } from "../controller/tree";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ItemContainer = styled.View`
  background-color: #fff;
  width: ${(props) => props.width * 0.9}px;

  margin-top: 10px;
  border-radius: 10px;
  padding: 10px;
`;

const MeaningContainer = styled.View`
  margin-top: 30px;
`;

const WordItem = ({ wordItem, indexWord, screenMode }) => {
  return (
    <ItemContainer width={windowWidth}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          variant="displayLarge"
          style={{
            fontWeight: "bold",
            color: textHeaderColor,
          }}
        >
          {wordItem.word}
        </Text>

        {screenMode === "Add" ? (
          <TouchableOpacity onPress={() => addWord(wordItem, indexWord)}>
            <MaterialIcons name="save-alt" size={30} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              deleteWord({
                word: wordItem.word,
                index: indexWord,
              })
            }
          >
            <MaterialIcons name="delete" size={30} color="black" />
          </TouchableOpacity>
        )}
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {wordItem?.phonetics.map((w, index) => (
          <View key={index}>
            {w.text && (
              <>
                {index !== wordItem?.phonetics.length - 1 ? (
                  <Text
                    key={index}
                    variant="titleLarge"
                    style={{
                      fontWeight: "bold",
                      color: textColor,
                      fontStyle: "italic",
                    }}
                  >
                    {w.text},{" "}
                  </Text>
                ) : (
                  <Text
                    key={index}
                    variant="titleLarge"
                    style={{
                      fontWeight: "bold",
                      color: textColor,
                      fontStyle: "italic",
                    }}
                  >
                    {w.text}.{" "}
                  </Text>
                )}
              </>
            )}
          </View>
        ))}
      </View>

      <MeaningContainer>
        {wordItem?.meanings.map((m, index) => (
          <WordMeaning meaning={m} key={index} />
        ))}
      </MeaningContainer>
    </ItemContainer>
  );
};

export default WordItem;

const styles = StyleSheet.create({});
