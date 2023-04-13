import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';

import GeneralDeviceUser2Screen from './GeneralDeviceUser2';

const AgreementScreen = ({ navigation }) => {
  const route = useRoute();
  const selectedDate = route.params?.selectedDate || null;
  const handleAgreePress = () => {
    console.log('I agree button pressed');
    navigation.navigate('General Details(Reserved)', { ...(selectedDate ? { selectedDate } : {}) });
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