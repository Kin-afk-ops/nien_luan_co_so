import { StyleSheet, Text, View } from "react-native";
import React from "react";
import styled from "styled-components/native";

const WordMeaning = ({ meaning }) => {
  return (
    <View
      styled={{
        innerHeight: 200,
        color: "red",
      }}
    >
      <Text>WordMeaning</Text>
    </View>
  );
};

export default WordMeaning;

const styles = StyleSheet.create({});
