import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RegisterDeviceScreen = () => {
  const [deviceName, setDeviceName] = useState('');
  const [deviceDetails, setDeviceDetails] = useState('');
  const [storageLocation, setStorageLocation] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = () => {
    // Process form submission here, e.g., send data to a server or save it to a local database
    console.log('Device Name:', deviceName);
    console.log('Device Details:', deviceDetails);
    console.log('Storage Location:', storageLocation);
    console.log('Category:', category);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register New Device</Text>
      <TextInput
        style={styles.input}
        placeholder="Device Name"
        onChangeText={setDeviceName}
        value={deviceName}
      />
      <TextInput
        style={styles.input}
        placeholder="Device Details"
        onChangeText={setDeviceDetails}
        value={deviceDetails}
      />
      <TextInput
        style={styles.input}
        placeholder="Storage Location"
        onChangeText={setStorageLocation}
        value={storageLocation}
      />
      <Text style={styles.label}>Category</Text>
      <DropDownPicker
        items={[
          { label: 'Laptop', value: 'Laptop' },
          { label: 'MacBook', value: 'MacBook' },
          { label: 'Android', value: 'Android' },
          { label: 'iPhone', value: 'iPhone' },
          { label: 'Other', value: 'Other' },
        ]}
        placeholder="Please choose from the list"
        onChangeItem={(item) => setCategory(item.value)}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        dropDownStyle={styles.dropdownList}
        labelStyle={styles.dropdownLabel}
        customArrowDown={(size, color) => <Ionicons name="chevron-down" size={size} color={color} />}
        customArrowUp={(size, color) => <Ionicons name="chevron-up" size={size} color={color} />}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Register Device</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dropdownContainer: {
    height: 40,
    marginBottom: 12,
  },
  dropdown: {
    borderWidth:   1,
    borderColor: '#ddd',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  dropdownList: {
    borderColor: '#ddd',
    borderRadius: 4,
  },
  dropdownLabel: {
    fontSize: 16,
    paddingHorizontal: 12,
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default RegisterDeviceScreen;

