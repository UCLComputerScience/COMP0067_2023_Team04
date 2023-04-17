// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginTab from './src/screens/Navigation/LoginTab';
import AuthContext from './src/screens/Navigation/AuthContext';
import { Linking } from 'react-native';

const App = () => {
  const [userRole, setUserRole] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const authContextValue = {
    userRole,
    setUserRole,
    accessToken,
    setAccessToken,
  };

  const linking = {
    prefixes: ['device-loan-app://'],
    config: {
      screens: {
        Login: 'auth',
      },
    },
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <NavigationContainer linking={linking}>
        <LoginTab />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
