import React, { useLayoutEffect } from 'react'
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const DetailDeviceAdmin = () => {

  const route = useRoute();
  const { deviceID } = route.params; 
  //console.log(deviceID);

  const deviceInfo = 
  {
    deviceName: 'Lenovo Legion Y9000P 2022 RTX 3070Ti',
    deviceID: '20220901001',
    standardLoanDuration: '14',
    extensionAllowance: '1',
    storageLocation: 'E17',
    QRCode: '010 001 110 001 001 010 111 010 110 100 001 011 111 001 101',
  };

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: deviceInfo.deviceName });
  }, [navigation, deviceInfo.deviceName]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.deviceName}>{deviceInfo.deviceName}</Text>
      <View style={styles.separator} />
      <View style={[styles.row, {marginTop: 10}]} >
        <Text style= {styles.label}>Device ID:</Text>
        <Text style= {styles.text}>{deviceInfo.deviceID}</Text>
      </View>
      <View style={styles.row} >
        <Text style= {styles.label}>Standard Loan Duration:</Text>
        <Text style= {styles.text}>{deviceInfo.standardLoanDuration} days</Text>
      </View>
      <View style={styles.row} >
        <Text style= {styles.label}>Extension Allowane:</Text>
        <Text style= {styles.text}>{deviceInfo.extensionAllowance} times</Text>
      </View>
      <View style={styles.row} >
        <Text style= {styles.label}>Storage Location:</Text>
        <Text style= {styles.text}>{deviceInfo.storageLocation}</Text>
      </View>
      <View style={[styles.row, {marginTop: 15}]} >
        <Text style= {styles.label}>QR code:</Text>
        <Text style= {styles.text}>{deviceInfo.QRCode}</Text>
      </View>
      <Text style= {{fontSize:16, fontWeight:'600', marginTop: 20, marginHorizontal: 10}}>Loan Details</Text>
      <View style={[styles.separator, {marginTop: 10}]} />
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  deviceName: {
    paddingHorizontal: 40,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ECECEC',
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  label: {
    flex:1,
    fontSize: 15,
    fontWeight: 'light'
  },
  text: {
    flex:0.8,
    fontSize: 15,
    fontWeight: 'thin'
  }
});

export default DetailDeviceAdmin