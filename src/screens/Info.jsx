import { StyleSheet, View } from "react-native";
import React from "react";
import { Avatar, Text } from "react-native-paper";
import { Dimensions } from "react-native";
import { Container } from "../components/styles/global";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Info = () => {
  return (
    <Container width={windowWidth} height={windowHeight}>
      <Avatar.Image
        style={{
          marginTop: 70,
        }}
        size={340}
        source={require("../../assets/avatar.jpg")}
      />
      <View
        style={{
          marginTop: 40,
        }}
      >
        <Text variant="titleMedium">
          <Text>Họ và tên:</Text> Nguyễn Vũ Linh
        </Text>
        <Text variant="titleMedium">MSSV: B2110130</Text>
        <Text variant="titleMedium">Lớp: DI2196A2</Text>
        <Text variant="titleMedium">
          Đề tài: Quản lý tự điển bằng cây tìm kiếm nhị phân kết hợp với file
          lưu trữ dữ liệu
        </Text>
      </View>
    </Container>
  );
};

export default Info;

const styles = StyleSheet.create({});
