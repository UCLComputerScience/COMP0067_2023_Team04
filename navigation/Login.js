import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AdminScheduleScreen from '../src/screens/AdminScheduleScreen';
import UserAppointmentScreen from '../src/screens/UserAppointmentScreen';
import AdminTabs from './AdminTabs';
import UserTabs from './UserTabs';

const LoginScreen = () => {
    const navigation = useNavigation();
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to My App</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AdminSchedule')}
        >
          <Text style={styles.buttonText}>Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UserAppointment')}
        >
          <Text style={styles.buttonText}>User</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const AdminScheduleScreen = () => {
    return (
      <View>
        <AdminTabs />
      </View>
    );
  };
  
  const UserAppointmentScreen = () => {
    return (
      <View>
        <UserTabs />
      </View>
    );
  };
  
  const App = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="AdminSchedule" component={AdminScheduleScreen} />
            <Stack.Screen name="UserAppointment" component={UserAppointmentScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 30,
    },
    button: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default LoginScreen;
