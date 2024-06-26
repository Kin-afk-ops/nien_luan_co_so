import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { textColor, textHeaderColor } from "./styles/global";
import WordMeaning from "./WordMeaning";
import { FontAwesome5, Feather, MaterialIcons } from "@expo/vector-icons";

import { addWord, createUri, deleteWord, readWord } from "../controller/tree";
import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;

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

const WordItem = ({
  wordItem,
  indexWord,
  screenMode,
  setWords,
  setListMode,
}) => {
  const handleDelete = async (wordItem, indexWord) => {
    await deleteWord({
      word: wordItem.word,
      index: indexWord,
    });

    setWords(await readWord());
    setListMode(true);
  };

  const handlePlaySound = async (audio) => {
    const soundObject = new Audio.Sound();

    try {
      await soundObject.loadAsync({ uri: audio });
      await soundObject.playAsync();
    } catch (error) {
      console.log("Error playing sound:", error);
    }
  };

  return (
    <ItemContainer width={windowWidth}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
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
          <TouchableOpacity
            onPress={() => {
              addWord(wordItem, indexWord);
              // AsyncStorage.removeItem("dataUri");
            }}
          >
            <MaterialIcons name="save-alt" size={30} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => handleDelete(wordItem, indexWord)}>
            <Feather name="trash" size={30} color="red" />
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
                  <View>
                    <Text
                      key={index}
                      variant="titleLarge"
                      style={{
                        fontWeight: "bold",
                        color: textColor,
                        fontStyle: "italic",
                      }}
                    >
                      {w.text}
                      {", "}
                    </Text>

                    {w.audio && (
                      <TouchableOpacity
                        onPress={() => handlePlaySound(w.audio)}
                      >
                        <AntDesign name="sound" size={24} color="black" />
                      </TouchableOpacity>
                    )}
                  </View>
                ) : (
                  <View>
                    <Text
                      key={index}
                      variant="titleLarge"
                      style={{
                        fontWeight: "bold",
                        color: textColor,
                        fontStyle: "italic",
                      }}
                    >
                      {w.text}.
                    </Text>
                    {w.audio && (
                      <TouchableOpacity
                        onPress={() => handlePlaySound(w.audio)}
                      >
                        <AntDesign name="sound" size={24} color="black" />
                      </TouchableOpacity>
                    )}
                  </View>
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
