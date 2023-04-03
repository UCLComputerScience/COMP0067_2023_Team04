import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const UserTermScreen = ({ navigation }) => {
  const handleAgreePress = () => {
    console.log('I agree button pressed');
    navigation.navigate('GeneralDeviceUser2');
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

export default UserTermScreen;