import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';

import GeneralDeviceUserScreen from './GeneralDeviceUser';

const AgreementScreen = ({ navigation }) => {
  const route = useRoute();
  const setAgr = route.params?.setAgr || null;
  const handleAgreePress = () => {
    console.log('I agree button pressed');
    if (setAgr) {
      setAgr(1);
    }
  
    navigation.goBack();
  };
  
   
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Term of Use</Text>
      <TouchableOpacity style={styles.button} onPress={handleAgreePress}>
        <Text style={styles.buttonText}>I agree</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 300,
  },
  buttonText: {
    color: 'red',
    fontSize: 16,
  },
});



export default AgreementScreen;