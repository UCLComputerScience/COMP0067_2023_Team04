import { View, Text, Button } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../Navigation/AuthContext";

const AdminSettingsScreen = () => {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    // logout logic here
    // for example, remove the user token or reset the user state
    parentNavigation = navigation.getParent();
    parentNavigation.goBack("Login"); // navigate back to the login screen after logout
    const state = navigation.getState();
    console.log(state);
  };

  //const parentNavigation = navigation.getParent();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>AdminSettingsScreen</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default AdminSettingsScreen;
