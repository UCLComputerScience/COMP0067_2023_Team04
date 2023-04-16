import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginTab from './src/screens/Navigation/LoginTab';
import AuthContext from './src/screens/Navigation/AuthContext';

const App = () => {
  const [userRole, setUserRole] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const authContextValue = {
    userRole,
    setUserRole,
    accessToken,
    setAccessToken,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <NavigationContainer>
        <LoginTab />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
