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
      <Stack.Navigator screenOptions={{headerShown:false}}>
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
    const [password, setPassword] = useState('');

    function handleLogin() {
      // Login logic
      const role = username === 'admin' && password === '123' ? 'admin' : username === 'user' && password === '123' ? 'user' : null;
      if (role) {
        setUserRole(role);
      }

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
        <TextInput
          style = {{width:'95%' ,height:40, borderColor: 'gray', borderBottomWidth: 1, marginBottom: 10, paddingHorizontal: 10}}
          placeholder="Login with your userID@ucl.ac.uk"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={{width:'95%', height: 40, borderColor: 'gray', borderBottomWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: 20 }}>
          <Button title="Login" onPress={handleLogin} />
        </View>
      </View>
    );
  }
}

export default LoginTab;
