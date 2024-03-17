import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import CircularProgress from "react-native-circular-progress-indicator";
import { Text } from "react-native-paper";

import { Dimensions } from "react-native";
import {
  Container,
  secondaryColor,
  textColor,
} from "../components/styles/global";
import { useIsFocused } from "@react-navigation/native";
import { readWord } from "../controller/tree";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Goal = () => {
  const isFocused = useIsFocused();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getWord = async () => {
      setTotal((await readWord()).length);
    };
    getWord();
  }, [isFocused]);

  return (
    <Container width={windowWidth} height={windowHeight}>
      <View
        style={{
          width: windowWidth * 0.9,
          backgroundColor: "white",
          alignItems: "center",
          paddingTop: 20,
          paddingBottom: 20,
          borderRadius: 10,
        }}
      >
        <CircularProgress
          radius={120}
          value={total}
          textColor={textColor}
          titleFontSize={20}
          maxValue={3000}
          inActiveStrokeColor={"black"}
          activeStrokeColor={total !== 3000 ? secondaryColor : "green"}
          inActiveStrokeOpacity={0.2}
          inActiveStrokeWidth={25}
          activeStrokeWidth={25}
          duration={2000}
          progressValueColor={"#ecf0f1"}
          showProgressValue={false}
          title={`${total} từ/3000 từ`}
          titleColor={textColor}
          titleStyle={{ fontWeight: "bold" }}
        />

        {total !== 3000 ? (
          <View
            style={{
              marginTop: 20,
            }}
          >
            <Text
              variant="headlineMedium"
              style={{
                fontWeight: "bold",
                color: textColor,
              }}
            >
              Chỉ còn {3000 - total} nữa thôi!
            </Text>
            <Text
              variant="headlineMedium"
              style={{
                fontWeight: "bold",
                color: textColor,
              }}
            >
              Cố lên bạn nhé! 💪
            </Text>
          </View>
        ) : (
          <View
            style={{
              marginTop: 20,
            }}
          >
            <Text
              variant="headlineSmall"
              style={{
                fontWeight: "bold",
                color: textColor,
              }}
            >
              Chặng đường dài nào cũng bắt đầu từ những bước chân đầu tiên!
            </Text>
            <Text
              variant="headlineSmall"
              style={{
                fontWeight: "bold",
                color: textColor,
              }}
            >
              Chúc mừng bạn 👍
            </Text>
          </View>
        )}
      </View>
    </Container>
  );
};

export default Goal;

const styles = StyleSheet.create({});
