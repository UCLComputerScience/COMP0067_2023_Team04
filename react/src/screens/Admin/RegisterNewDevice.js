import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const RegisterDeviceScreen = () => {
  const [deviceName, setDeviceName] = useState('');
  const [deviceDetails, setDeviceDetails] = useState('');
  const [storageLocation, setStorageLocation] = useState('');
  const [category, setCategory] = useState(null);
  const [open, setOpen] = useState(false);

  const categories = [
    { label: 'Laptop', value: 'Laptop' },
    { label: 'MacBook', value: 'MacBook' },
    { label: 'Android', value: 'Android' },
    { label: 'iPhone', value: 'iPhone' },
    { label: 'Other', value: 'Other' },
  ];

  const handleSubmit = () => {
    // Process form submission here, e.g., send data to a server or save it to a local database
    console.log('Device Name:', deviceName);
    console.log('Device Details:', deviceDetails);
    console.log('Storage Location:', storageLocation);
    console.log('Category:', category);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category</Text>
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
      <DropDownPicker
        items={categories}
        open={open}
        value={category}
        setOpen={setOpen}
        setValue={setCategory}
        containerStyle={styles.dropdownContainer}
        style={{...styles.dropdown, borderColor: 'transparent'}}
        itemStyle={styles.dropdownItem}
        labelStyle={styles.dropdownLabel}
        dropDownStyle={styles.dropdownList}
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
    height: 60,
    marginBottom: 12,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  dropdownItem: {
    justifyContent: 'flex-start',
  },
  dropdownLabel: {
    fontSize: 16,
    color: '#000',
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
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
