import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { Container } from "../components/styles/global";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Home = () => {
  return (
    <Container width={windowWidth} height={windowHeight}>
      <Text>Haha</Text>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({});
