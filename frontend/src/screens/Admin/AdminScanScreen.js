import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import DetailDeviceAdmin from './DetailDeviceAdmin';
import { createStackNavigator } from '@react-navigation/stack';

const QRCodeScanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    navigation.navigate('Detail', { deviceID: data });
  };

  if (hasPermission === null) {
    return (
      <View style={styles.permissionview}>
        <Text>Requesting for camera permission</Text>
      </View>
    )
  }
  if (hasPermission === false) {
    return(
      <View style={styles.permissionview}>
        <Text style={styles.permissiontext}>No access to camera</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Text onPress={() => setScanned(false)} style={styles.button}>
          Tap to Scan Again
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    fontSize: 16,
    textAlign: 'center',
    color: 'blue',
  },
  permissionview:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  permissiontext: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center'
  }
});


const Stack = createStackNavigator();

const AdminScanScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="QRCodeScanner" component={QRCodeScanner} />
      <Stack.Screen name="Detail" component={DetailDeviceAdmin} />
    </Stack.Navigator>
  )
}

export default AdminScanScreen