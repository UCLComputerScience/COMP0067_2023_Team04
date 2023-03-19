import { View, Text, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const AdminSettingsScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // logout logic here
    // for example, remove the user token or reset the user state
    parentNavigation = navigation.getParent();
    parentNavigation.goBack('Login'); // navigate back to the login screen after logout
    const state = navigation.getState();
    console.log(state);
  };

  //const parentNavigation = navigation.getParent();


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>AdminSettingsScreen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default AdminSettingsScreen;
