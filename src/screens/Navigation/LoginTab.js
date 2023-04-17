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
      <NavigationContainer>
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
