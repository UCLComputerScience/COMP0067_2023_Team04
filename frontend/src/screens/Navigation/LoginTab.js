import React, { useState, useContext, useEffect } from "react";
import { View, Text, Button, SafeAreaView } from "react-native";
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import AdminTabs from "./AdminTabs";
import UserTabs from "./UserTabs";
import { createStackNavigator } from "@react-navigation/stack";
import AuthContext from "./AuthContext";
import * as Linking from "expo-linking";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";

const getRedirectUri = () => {
  const redirectUri = AuthSession.makeRedirectUri();
  console.log("Generated Redirect URI:", redirectUri);
  WebBrowser.openBrowserAsync(
    "https://0067team4app.azurewebsites.net/posts/authorise"
  );
  return redirectUri;
};

//onPress={() => WebBrowser.openBrowserAsync('https://expo.dev')
const linking = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      LoginTabScreen: "",
      AdminTabs: {
        screens: {
          AdminSchedule: "Schedule",
          //
        },
      },
      UserTabs: {
        screens: {
          userDevice: "userDevices",
        },
      },
    },
  },
};

// Event Listener

const LoginTabScreen = () => {
  useEffect(() => {
    const handleUrlEvent = async (event) => {
      const url = event.url;
      console.log("url defined");
      if (url) {
        const tokenRegex = /[?&]token=([^&#]*)/;
        const match = url.match(tokenRegex);
        const jwtToken =
          match && match[1] ? decodeURIComponent(match[1]) : null;

        console.log("JWT Token:", jwtToken);

        if (jwtToken) {
          const existingToken = await SecureStore.getItemAsync("jwtToken");
          if (!existingToken) {
            try {
              await SecureStore.setItemAsync("jwtToken", jwtToken);
              console.log("JWT token 存储成功");
            } catch (error) {
              console.log("JWT token 存储失败:", error);
            }
          } else {
            console.log("JWT token 已存在，跳过存储");
            return; // 如果 JWT 令牌已存在，则立即返回
          }
        }

        // const path = url.split("/--/")[1];
        // if (path === "Schedule") {
        //  navigation.navigate("AdminTabs");
        //}
        // if (path === "userDevices") {
        //  navigation.navigate("UserTabs");
        // }
      }
    };

    const subscription = Linking.addEventListener("url", handleUrlEvent);

    // Linking.addEventListener("url", handleUrlEvent);

    // Check the initial URL on app start
    (async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) handleUrlEvent({ url: initialUrl });
    })();

    // Clean up the event listener on unmount
    return () => {
      subscription.remove();
      // Linking.removeEventListener(handleUrlEvent);
    };
  }, []);

  const navigation = useNavigation();
  const loginAsAdmin = () => {
    navigation.navigate("AdminTabs");
  };
  const loginAsUser = () => {
    navigation.navigate("UserTabs");
  };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <Button title="SSO Login" onPress={getRedirectUri} />
      <Button title="Admin Login" onPress={loginAsAdmin} />
      <Button title="User Login" onPress={loginAsUser} />
    </SafeAreaView>
  );
};

const Stack = createStackNavigator();
const LoginTab = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerLeft: null,
          gestureEnabled: false,
          headerBackVisible: false,
        }}
      >
        <Stack.Screen name="LoginTabScreen" component={LoginTabScreen} />
        <Stack.Screen name="AdminTabs" component={AdminTabs} />
        <Stack.Screen name="UserTabs" component={UserTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginTab;
