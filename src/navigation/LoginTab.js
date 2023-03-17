import React, { useState } from 'react';
import { Image, View, Text, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AdminTabScreen from './AdminTabs';
import UserTabScreen from './UserTabs';

const Stack = createStackNavigator();

function LoginTab() {
  const [userRole, setUserRole] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName = 'Login'>
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

  function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');

    function handleLogin() {
      // SSO login logic
      const role = 'user'; // Assume successful login
      setUserRole(role);
    }

    // For frontend development only
    function handleAdminLogin() {
      const role = 'admin';
      setUserRole(role);
    }

    function handleUserLogin() {
      const role = 'user';
      setUserRole(role);
    }

    return (
      <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
        <Image 
            source={require('../components/icons/UCL.png')}
            resizeMode = 'contain'
            style={{
                width: 100,
                height: 50,
            }}
        />
        <Text style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 10, textAlign: 'left' }}>Sign in</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginRight: 20 }}>
          <Button title="SSO Login" onPress={handleLogin} />
        </View >
        <View style={{ flex:0.6 ,flexDirection: 'row', justifyContent: 'center', alignItems:'center' }}>
          <Button title="Admin Login" onPress={handleAdminLogin} />
          <Button title="User Login" onPress={handleUserLogin} />
        </View>
      </View>
    );
  }
}

export default LoginTab;
