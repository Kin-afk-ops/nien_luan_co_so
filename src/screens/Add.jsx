import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import { Dimensions } from "react-native";
import { Container, primaryColor } from "../components/styles/global";
import axios from "axios";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Add = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    try {
      if (searchQuery !== "") {
        const res = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${searchQuery.toLowerCase()}`
        );
        console.log(searchQuery);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
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
      />
    </Container>
  );
};

export default Add;

const styles = StyleSheet.create({});
