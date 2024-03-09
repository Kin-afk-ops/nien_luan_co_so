import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import WordListItem from "./WordListItem";

const WordList = ({ words }) => {
  return (
    <View>
      {words?.length !== 0 &&
        words?.map((word, index) => <WordListItem word={word} key={index} />)}
    </View>
  );
};

export default WordList;

const styles = StyleSheet.create({});
