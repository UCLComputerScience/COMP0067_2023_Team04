import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, ScrollView, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const RegisterDeviceScreen = () => {
  const [deviceName, setDeviceName] = useState('');
  const [deviceDetails, setDeviceDetails] = useState('');
  const [storageLocation, setStorageLocation] = useState('');
  const [category, setCategory] = useState(null);
  const [open, setOpen] = useState(false);
  const [ruleExt, setRuleExt] = useState(0);
  const [ruleDur, setRuleDur] = useState('');
  const [launchYr, setLaunchYr] = useState('');
  const [cost, setCost] = useState('');

  const categories = [
    { label: 'Laptop', value: 'Laptop' },
    { label: 'MacBook', value: 'MacBook' },
    { label: 'Android', value: 'Android' },
    { label: 'iPhone', value: 'iPhone' },
    { label: 'Other', value: 'Other' },
  ];


  const handleSubmit = () => {
    if (!deviceName || !deviceDetails || !storageLocation || !category || !ruleDur || !launchYr || !cost) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    // Process form submission here, e.g., send data to a server or save it to a local database
    console.log('Device Name:', deviceName);
    console.log('Device Details:', deviceDetails);
    console.log('Storage Location:', storageLocation);
    console.log('Category:', category);
    console.log('Allow to extent?:', ruleExt === 1 ? 'Yes' : 'No');
    console.log('Loan Duration:', ruleDur);
    console.log('Launch Year:', launchYr);
    console.log('Cost:', cost);
  };


  const toggleSwitch = () => {
    setRuleExt(prevValue => prevValue === 0 ? 1 : 0);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.label}>Device Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Device Name"
          onChangeText={setDeviceName}
          value={deviceName}
        />
        <Text style={styles.label}>Device Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Device Details"
          onChangeText={setDeviceDetails}
          value={deviceDetails}
        />
        <Text style={styles.label}>Storage Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Storage Location"
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
        <Text style={styles.label}>Allow to extent?</Text>
        <Switch
          trackColor={{ false: '#ddd', true: '#2196F3' }}
          thumbColor={ruleExt === 1 ? '#fff' : '#fff'}
          ios_backgroundColor="#ddd"
          onValueChange={toggleSwitch}
          value={ruleExt === 1}
        />
        <Text style={styles.label}>Loan Duration</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter Loan Duration (days)"
          onChangeText={setRuleDur}
          value={ruleDur}
        />
        <Text style={styles.label}>Launch Year</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter Launch Year"
          onChangeText={setLaunchYr}
          value={launchYr}
        />
        <Text style={styles.label}>Cost</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter Cost(£)"
          onChangeText={setCost}
          value={cost}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Register Device</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    marginTop: 20,
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
    backgroundColor: '#AC145A',
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
