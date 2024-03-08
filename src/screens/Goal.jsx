import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { Container } from "../components/styles/global";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Goal = () => {
  return (
    <Container width={windowWidth} height={windowHeight}>
      <Text>Goal</Text>
    </Container>
  );
};

export default Goal;

const styles = StyleSheet.create({});
