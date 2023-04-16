import React, { useState, useEffect, useContext } from 'react';
import { Image, View, Text, Button, Linking, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AdminTabScreen from './AdminTabs';
import UserTabScreen from './UserTabs';
import jwtDecode from 'jwt-decode';
import api from '../config';
import AuthContext from './AuthContext';

const Stack = createStackNavigator();

function LoginTab() {
  const { userRole, setUserRole } = useContext(AuthContext);

  useEffect(() => {
    const handleDeepLink = async (event) => {
      const url = new URL(event.url);
      const jwtToken = url.searchParams.get('token');

      try {
        const decoded = jwtDecode(jwtToken);
        const { role, apiToken } = decoded;

        setUserRole(role);
        await AsyncStorage.setItem('accessToken', apiToken);
      } catch (error) {
        // Handle error
      }
    };

    Linking.addEventListener('url', handleDeepLink);

    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        {userRole === 'admin' ? (
          <Stack.Screen
            name="AdminTab"
            component={AdminTabScreen}
            options={{ title: 'Admin Tab Screen' }}
          />
        ) : userRole === 'user' ? (
          <Stack.Screen
            name="UserTab"
            component={UserTabScreen}
            options={{ title: 'User Tab Screen' }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Login', headerShown: true }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function LoginScreen() {
  const handleLogin = () => {
    api.get('oauth').then((response) => {
      if (response.data && response.data.url) {
        Linking.openURL(response.data.url);
      } else {
        // Handle error
      }
    }).catch((error) => {
      // Handle error
    });
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Image
        source={require('../../components/icons/UCL.png')}
        resizeMode="contain"
        style={{
          width: 100,
          height: 50,
        }}
      />
      <Text style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 10, textAlign: 'left' }}>Sign in</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginRight: 20 }}>
        <Button title="SSO Login" onPress={handleLogin} />
      </View>
    </View>
  );
}

export default LoginTab;