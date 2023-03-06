import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/AdminTabs';
import UserTabs from './navigation/UserTabs';

const App = () =>{
  return(
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>


  );
}

export default App;