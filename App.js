import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AdminTabScreen from './navigation/AdminTabs';
import UserTabScreen from './src/screens/UserTabScreen';

const Stack = createStackNavigator();

function App() {
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
            options={{ title: 'Login Screen' }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );

  function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
      // 假设验证通过，并且用户的角色为'admin'或'user'，则将userRole状态设置为对应的值
      const role = username === 'admin' && password === '123' ? 'admin' : username === 'user' && password === '123' ? 'user' : null;
      if (role) {
        setUserRole(role);
      }

      // 跳转到对应的屏幕组件
      if (role === 'admin') {
        navigation.navigate('AdminTab', { screen: 'Schedule' });
      } else if (role === 'user') {
        navigation.navigate('UserTab');
      }
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Login Screen</Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    );
  }
}

export default App;
