import React, { useLayoutEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Button,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const DetailDeviceAdmin = () => {
  const route = useRoute();
  const { deviceID } = route.params;
  //console.log(deviceID);

  const deviceInfo = {
    deviceName: "Lenovo Legion Y9000P 2022 RTX 3070Ti",
    //deviceID: "20220901001",
    standardLoanDuration: "14",
    extensionAllowance: "1",
    storageLocation: "E17",
    QRCode: "010 001 110 001 001 010 111 010 110 100 001 011 111 001 101",
  };

  const loanDetails = {
    loanDate: "2022-03-21",
    userID: "ucabcda",
    deviceState: "Loaned",
    //how to achieve the status change? fetch from DB (require refresh) : change from frontend once clicked
  };

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: deviceInfo.deviceName });
  }, [navigation, deviceInfo.deviceName]);

  const getButtonInfo = () => {
    if (loanDetails.deviceState === "Reserved") {
      return { title: "Loan", newState: "Loaned" };
    } else if (loanDetails.deviceState === "Loaned") {
      return { title: "Return", newState: "Available" };
    } else {
      return { title: "Not Applicable", newState: null };
    }
  };

  const buttonInfo = getButtonInfo();

  const updateDeviceState = async () => {
    try {
      // Backend
      const response = await fetch("https://yourapi.com/updateDeviceState", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deviceID,
          newState: "您需要将设备状态更改为的新状态",
        }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert("Success", "Device state updated successfully.");
      } else {
        Alert.alert("Error", "Failed to update device state.");
      }
    } catch (error) {
      console.error("Error updating device state:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.deviceName}>{deviceID}</Text>
        <Text style={styles.deviceName}>{deviceInfo.deviceName}</Text>
        <View style={styles.separator} />
        <View style={[styles.row, { marginTop: 10 }]}>
          <Text style={styles.label}>Device ID:</Text>
          <Text style={styles.text}>{deviceID}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Standard Loan Duration:</Text>
          <Text style={styles.text}>
            {deviceInfo.standardLoanDuration} days
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Extension Allowane:</Text>
          <Text style={styles.text}>{deviceInfo.extensionAllowance} times</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Storage Location:</Text>
          <Text style={styles.text}>{deviceInfo.storageLocation}</Text>
        </View>
        <View style={[styles.row, { marginTop: 15 }]}>
          <Text style={styles.label}>QR code:</Text>
          <Text style={styles.text}>{deviceInfo.QRCode}</Text>
        </View>
        <Text style={styles.textLoanDetails}>Loan Details</Text>
        <View style={[styles.separator, { marginTop: 10 }]} />
        <View style={[styles.row, { marginTop: 10 }]}>
          <Text style={styles.label}>Loan date:</Text>
          <Text style={styles.text}>{loanDetails.loanDate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>User ID:</Text>
          <Text style={styles.text}>{loanDetails.userID}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Device State:</Text>
          <Text style={styles.text}>{loanDetails.deviceState}</Text>
        </View>
        <View style={styles.buttonRow}>
          <View style={{ flex: 0.8 }}></View>
          <View style={{ flex: 1 }}>
            <Button title="Report issue" />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity></TouchableOpacity>
        <Button
          title={`${buttonInfo.title}`}
          onPress={() => Alert.alert("Success")}
          //onPress={updateDeviceState}
          // disable when null
          disabled={!buttonInfo.newState}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  textContainer: {
    flex: 2,
  },
  deviceName: {
    paddingHorizontal: 40,
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    padding: 10,
  },
  textLoanDetails: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginHorizontal: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#ECECEC",
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },
  row: {
    flexDirection: "row",
    marginHorizontal: 10,
  },
  label: {
    flex: 1,
    fontSize: 15,
    fontWeight: "light",
  },
  text: {
    flex: 0.8,
    fontSize: 15,
    fontWeight: "thin",
  },
  buttonContainer: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default DetailDeviceAdmin;
