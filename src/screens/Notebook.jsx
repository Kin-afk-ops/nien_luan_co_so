import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import { Container } from "../components/styles/global";

const Notebook = () => {
  return (
    <Container width={windowWidth} height={windowHeight}>
      <Text>Notebook</Text>
    </Container>
  );
};

export default Notebook;

const styles = StyleSheet.create({
  container: {},
});
