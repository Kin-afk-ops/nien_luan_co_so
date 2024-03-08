import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { Container } from "../components/styles/global";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Info = () => {
  return (
    <Container width={windowWidth} height={windowHeight}>
      <Text>Info</Text>
    </Container>
  );
};

export default Info;

const styles = StyleSheet.create({});
