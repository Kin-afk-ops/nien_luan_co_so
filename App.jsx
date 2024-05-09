import "react-native-gesture-handler";
import * as React from "react";
import { PaperProvider } from "react-native-paper";
import { Home, Goal, Notebook, Add, Info } from "./src/screens";
import { FontAwesome } from "@expo/vector-icons";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#fff",
  },
};

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen
            name="home"
            component={Home}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <FontAwesome
                      name="home"
                      size={24}
                      color={focused ? "#00CCFF" : "#555"}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: focused ? "#00CCFF" : "#555",
                      }}
                    >
                      Nhà
                    </Text>
                  </View>
                );
              },
            }}
          />
          <Tab.Screen
            name="Goal"
            component={Goal}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <MaterialCommunityIcons
                      name="arm-flex"
                      size={24}
                      color={focused ? "#00CCFF" : "#555"}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: focused ? "#00CCFF" : "#555",
                      }}
                    >
                      Mục tiêu
                    </Text>
                  </View>
                );
              },
            }}
          />

          <Tab.Screen
            name="Add"
            component={Add}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      position: "absolute",
                      bottom: 10,
                    }}
                  >
                    <FontAwesome
                      name="search"
                      size={60}
                      color={focused ? "#00CCFF" : "#555"}
                    />
                  </View>
                );
              },
            }}
          />

          <Tab.Screen
            name="Notebook"
            component={Notebook}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FontAwesome
                      name="book"
                      size={24}
                      color={focused ? "#00CCFF" : "#555"}
                    />

                    <Text
                      style={{
                        fontSize: 12,
                        color: focused ? "#00CCFF" : "#555",
                      }}
                    >
                      Sổ tay
                    </Text>
                  </View>
                );
              },
            }}
          />

          <Tab.Screen
            name="Info"
            component={Info}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FontAwesome
                      name="info-circle"
                      size={24}
                      color={focused ? "#00CCFF" : "#555"}
                    />

                    <Text
                      style={{
                        fontSize: 12,
                        color: focused ? "#00CCFF" : "#555",
                      }}
                    >
                      thông tin
                    </Text>
                  </View>
                );
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
