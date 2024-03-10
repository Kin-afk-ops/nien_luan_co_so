import { StyleSheet, Text, View, ScrollView, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

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

const Notebook = () => {
  const index = 0;
  const [listMode, setListMode] = useState(true);
  const [word, setWord] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const backAction = () => {
      setListMode(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleSetWordItem = async () => {
    setListMode(false);
    setLoading(true);
    const res = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/hello`
    );

    if (res.data) {
      setLoading(false);
      setWord(res.data[index]);
      setListMode(false);
    }
  };

  return (
    <Container width={windowWidth} height={windowHeight}>
      <ScrollView>
        {listMode ? (
          <View>
            <List.Item
              // key={index}
              title="Hello"
              description="haha"
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
              onPress={() => handleSetWordItem()}
            />
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
