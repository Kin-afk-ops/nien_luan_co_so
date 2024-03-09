import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { List } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Sound } from "expo-av/build/Audio";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const RightIcon = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 60px;
  align-items: center;
`;

const WordListItem = ({ word }) => {
  const [audioUrl, setAudioUrl] = useState("");
  const [audio, setAudio] = useState();

  useEffect(() => {
    const handleSetAudio = () => {
      word.phonetics.forEach((p) => {
        if (p.audio !== "") {
          setAudioUrl(p.audio);
          return;
        }
      });
    };
    handleSetAudio();
  }, [word]);

  const handlePlayAudio = () => {
    const sound1 = new Sound(
      "https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/pew2.aac",
      "",
      (error, sound) => {
        if (error) {
          alert("error" + error.message);
          return;
        }
        sound1.play(() => {
          sound1.release();
        });
      }
    );
  };

  return (
    <List.Item
      title={word.word}
      description={word.phonetic}
      style={{
        width: windowWidth * 0.9,
        backgroundColor: "#fff",
        marginTop: 10,
        borderRadius: 10,
      }}
      right={(props) => (
        <RightIcon>
          {/* {audioUrl && ( */}
          <MaterialIcons
            name="multitrack-audio"
            size={24}
            color="black"
            onPress={() => handlePlayAudio()}
          />
          {/* )} */}

          <FontAwesome5 name="save" size={24} color="black" />
        </RightIcon>
      )}
    />
  );
};

export default WordListItem;

const styles = StyleSheet.create({});
