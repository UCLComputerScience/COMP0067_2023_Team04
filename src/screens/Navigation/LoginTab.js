import React, { useState } from 'react';
import { Image, View, Text, TextInput, Button, Linking} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AdminTabScreen from './AdminTabs';
import UserTabScreen from './UserTabs';

const Stack = createStackNavigator();
const CLIENT_ID = "0830044936260096.0010110257374561";

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function LoginTab() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const handleDeepLink = async (event) => {
      const url = new URL(event.url);
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');

      try {
        const response = await fetch(`https://your-server.com/oauth/callback?code=${code}&state=${state}`);
        const data = await response.json();

        if (data.success) {
          setUserRole(data.role);
        } else {
          // Handle error
        }
      } catch (error) {
        // Handle error
      }
    };

    Linking.addEventListener('url', handleDeepLink);

    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, []);

  const handleLogin = () => {
    const url = `https://uclapi.com/oauth/authorise?client_id=` + CLIENT_ID + `&state=` + generateRandomString(16);
    Linking.openURL(url);
  };

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

    // For frontend development only
    function handleAdminLogin() {
      const role = 'admin';
      setUserRole(role);
    }

    function handleUserLogin() {
      const role = 'user';
      setUserRole(role);
    }
    //

    return (
      <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
        <Image 
            source={require('../../components/icons/UCL.png')}
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
