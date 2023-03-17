import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailDeviceAdmin from './DetailDeviceAdmin';
import CollapsibleList from './AdminScanScreen';

const Stack = createStackNavigator();

const AdminDevicesScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={CollapsibleList} />
      <Stack.Screen name="Detail" component={DetailDeviceAdmin} />
    </Stack.Navigator>
  )
}

export default AdminDevicesScreen