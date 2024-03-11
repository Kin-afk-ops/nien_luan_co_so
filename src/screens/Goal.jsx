import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import CircularProgress from "react-native-circular-progress-indicator";
import { Text } from "react-native-paper";

import { Dimensions } from "react-native";
import {
  Container,
  secondaryColor,
  textColor,
} from "../components/styles/global";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Goal = () => {
  const [value, setValue] = useState(0);
  const temp = 0;

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
          value={temp}
          textColor={textColor}
          titleFontSize={20}
          maxValue={3000}
          inActiveStrokeColor={"black"}
          activeStrokeColor={temp !== 3000 ? secondaryColor : "green"}
          inActiveStrokeOpacity={0.2}
          inActiveStrokeWidth={25}
          activeStrokeWidth={25}
          duration={3000}
          progressValueColor={"#ecf0f1"}
          showProgressValue={false}
          title={`${temp} từ/3000 từ`}
          titleColor={textColor}
          titleStyle={{ fontWeight: "bold" }}
          onAnimationComplete={() => setValue(50)}
        />

        {temp !== 3000 ? (
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
              Chỉ còn {3000 - temp} nữa thôi!
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
