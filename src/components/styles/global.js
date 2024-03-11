import styled from "styled-components/native";

export const primaryColor = "#ccffff";
export const textHeaderColor = "#00CCFF";
export const textColor = "#555";
export const secondaryColor = "#00CCFF";

export const Container = styled.View`
  background-color: #ccffff;

  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  display: flex;
  align-items: center;
  padding-top: 40px;
`;
