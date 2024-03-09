import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { primaryColor, textColor, textHeaderColor } from "./styles/global";
import WordMeaning from "./WordMeaning";

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

const WordItem = ({ wordItem }) => {
  return (
    <ItemContainer width={windowWidth}>
      <Text
        variant="displayLarge"
        style={{
          fontWeight: "bold",
          color: textHeaderColor,
        }}
      >
        {wordItem.word}
      </Text>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {wordItem?.phonetics.map((w, index) => (
          <>
            {w.text && (
              <>
                {index !== wordItem.phonetics.length - 1 ? (
                  <Text
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
          </>
        ))}
      </View>

      <MeaningContainer>
        {wordItem?.meanings.map((m, index) => (
          <WordMeaning meaning={m} />
        ))}
      </MeaningContainer>
    </ItemContainer>
  );
};

export default WordItem;

const styles = StyleSheet.create({});
