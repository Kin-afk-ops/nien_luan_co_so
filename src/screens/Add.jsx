import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import { Dimensions } from "react-native";
import { Container, primaryColor } from "../components/styles/global";
import axios from "axios";
import WordList from "../components/WordList";
import Loading from "../components/Loading";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Add = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      if (searchQuery !== "") {
        setLoading(true);
        const res = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${searchQuery.toLowerCase()}`
        );

        if (res.data) {
          setLoading(false);
          setWords(res.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = () => {
    setWords([]);
  };

  return (
    <Container width={windowWidth} height={windowHeight}>
      <Searchbar
        placeholder="Từ vựng hôm nay..."
        value={searchQuery}
        onChangeText={(query) => setSearchQuery(query)}
        mode="bar"
        selectionColor={primaryColor}
        outlineStyle={{
          borderColor: "#00CCFF",
          borderRadius: 10,
        }}
        textColor="#7a7a7a"
        style={{
          width: windowWidth * 0.9,
          backgroundColor: "#FFFFFF",
        }}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
        onClearIconPress={handleClear}
      />

      {loading ? <Loading /> : <WordList words={words} />}
    </Container>
  );
};

export default Add;

const styles = StyleSheet.create({});
