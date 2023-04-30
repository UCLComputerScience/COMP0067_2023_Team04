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

/*const getRedirectUri = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/details/Lenovo Legion Y9000P 2022 RTX 3070ti`
    );
    console.log("Received data from API:", response.data);
    setDevice(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
useEffect(() => {
  fetchDeviceData();
}, []);*/

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

        // 在此处记录 JWT 令牌
        console.log("JWT Token:", jwtToken);

        // 这里可以将 jwtToken 发送给后端进行验证

        try {
          await SecureStore.setItemAsync("jwtToken", jwtToken);
          console.log("JWT token 存储成功");
        } catch (error) {
          console.log("JWT token 存储失败:", error);
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
  const { loginAsAdmin, loginAsUser } = useContext(AuthContext);
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
  const [userRole, setUserRole] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const loginAsAdmin = () => {
    setUserRole("admin");
    setAccessToken("your_admin_access_token");
  };
  const loginAsUser = () => {
    setUserRole("user");
    setAccessToken("your_user_access_token");
  };
  const logout = () => {
    setUserRole(null);
    setAccessToken(null);
  };
  const authContextValue = {
    userRole,
    setUserRole,
    accessToken,
    setAccessToken,
    loginAsAdmin,
    loginAsUser,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <NavigationContainer linking={linking}>
        {userRole ? (
          userRole === "admin" ? (
            <AdminTabs />
          ) : (
            <UserTabs />
          )
        ) : (
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
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default LoginTab;
