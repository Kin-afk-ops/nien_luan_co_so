import { StyleSheet, View } from "react-native";
import React from "react";
import { Text, List } from "react-native-paper";

import styled from "styled-components/native";
import { primaryColor, textColor } from "./styles/global";

const DefinitionsWrapper = styled.View`
  margin-top: 10px;
  margin-bottom: 25px;
`;

const WordMeaning = ({ meaning }) => {
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <View>
          <Text
            variant="titleLarge"
            style={{
              minWidth: 50,
              textAlign: "center",
              fontWeight: "bold",
              color: textColor,
            }}
          >
            {meaning?.partOfSpeech}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: primaryColor,
          }}
        />
      </View>

      <DefinitionsWrapper>
        {meaning?.definitions.map((d, index) => (
          <View
            style={{
              marginBottom: 20,
            }}
          >
            <Text
              key={index}
              style={{
                color: textColor,

                textAlign: "justify",
              }}
            >
              {meaning?.definitions.length === 1 ? (
                <>{d.definition}</>
              ) : (
                <>
                  {index + 1}. {d.definition}
                </>
              )}
            </Text>

            {d.example && (
              <Text
                style={{
                  fontStyle: "italic",
                  fontWeight: "100",
                  color: textColor,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Example:
                </Text>{" "}
                {d.example}
              </Text>
            )}
          </View>
        ))}
      </DefinitionsWrapper>
    </View>
  );
};

export default WordMeaning;

const styles = StyleSheet.create({});
