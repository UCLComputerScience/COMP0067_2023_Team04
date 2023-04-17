import React, { useState, useContext } from "react";
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

const LoginTabScreen = () => {
  const navigation = useNavigation();
  const { loginAsAdmin, loginAsUser } = useContext(AuthContext);
  return (
    <SafeAreaView>
      <Button title="SSO Login" />
      <Button title="Admin Login" onPress={loginAsAdmin} />
      <Button title="User Login" onPress={loginAsUser} />
    </SafeAreaView>
  );
};
const Stack = createStackNavigator();
const LoginTab = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const loginAsAdmin = () => {
    setIsAdmin(true);
    setLoggedIn(true);
  };
  const loginAsUser = () => {
    setIsAdmin(false);
    setLoggedIn(true);
  };
  const logout = () => {
    setLoggedIn(false);
    setIsAdmin(false);
  };
  const authContextValue = {
    loggedIn,
    isAdmin,
    loginAsAdmin,
    loginAsUser,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <NavigationContainer>
        {loggedIn ? (
          isAdmin ? (
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
