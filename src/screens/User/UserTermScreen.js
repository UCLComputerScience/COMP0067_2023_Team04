import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';

import GeneralDeviceUser2Screen from './GeneralDeviceUser2';

const AgreementScreen = ({ navigation }) => {
  const route = useRoute();
  const collectTime = route.params?.collectTime;
  const handleAgreePress = () => {
    console.log('I agree button pressed');
    navigation.navigate('General Details(Reserved)');
  };

  return (
    <View style={styles.container}>
      <Text>Term of Use</Text>
      <TouchableOpacity style={styles.button} onPress={handleAgreePress}>
        <Text style={styles.buttonText}>I agree</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

const Stack = createStackNavigator();

const UserTermScreen = () => {
  return (
    
    <Stack.Navigator>
      <Stack.Screen name="Term of Use" component={AgreementScreen} options={{ headerShown: true }}/>
      <Stack.Screen
        name="General Details(Reserved)"
        component={GeneralDeviceUser2Screen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>

  );
};

export default UserTermScreen;