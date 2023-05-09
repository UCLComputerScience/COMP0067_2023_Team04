import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Button,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DetailDeviceAdmin from "./DetailDeviceAdmin";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

const GeneralDeviceAdminScreen = () => {
  //!!! replace :name with variables when dubug finished by Dr. Fu
  const API_BASE_URL = "https://0067team4app.azurewebsites.net/posts";
  const navigation = useNavigation();
  const route = useRoute();
  const deviceName = route.params?.deviceName;

  console.log("route.params:", route.params);
  console.log("deviceName:", deviceName);

  async function getJwtToken() {
    try {
      const jwtToken = await SecureStore.getItemAsync("jwtToken");
      if (jwtToken) {
        console.log("JWT token fetched:", jwtToken);
        return jwtToken;
      } else {
        console.log("Cannot find JWT token");
        return null;
      }
    } catch (error) {
      console.log("JWT token fetched failed:", error);
      return null;
    }
  }

  //Devices list from DB, successful
  const [device, setDevice] = useState("");
  const fetchDeviceData = async () => {
    try {
      const jwtToken = await getJwtToken();
      const response = await axios.get(
        `${API_BASE_URL}/details/${deviceName}`,
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
        }
      );
      console.log("Received data from API:", response.data);
      console.log("Received details from API:", response.data.details);
      setDevice(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchDeviceData();
  }, []);

  const summaryDetailsUnpacked = device ? JSON.parse(device.details) : null;

  const [devices, setDevices] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      const fetchDevicesData = async () => {
        try {
          const jwtToken = await getJwtToken();
          const response = await axios.get(
            `${API_BASE_URL}/idByName/${deviceName}`,
            {
              headers: { Authorization: `Bearer ${jwtToken}` },
            }
          );
          //console.log("Received data from API:", response.data);
          setDevices(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchDevicesData();
    }, [])
  );

  const [history, setHistory] = useState({});
  const fetchHistoryData = async () => {
    try {
      const jwtToken = await getJwtToken();
      const response = await axios.get(
        `${API_BASE_URL}/loansHistoryByName/${deviceName}`,
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
        }
      );
      //console.log("Received data from API:", response.data);
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchHistoryData();
  }, []);

  const [storageLocation, setStorageLocation] = useState("");
  const [addModalVisible, setAddModalVisible] = useState(false);

  const submitDevice = async () => {
    if (typeof device !== "object" || device === null) {
      // device should be json
      console.error("Device is not available yet.");
      return;
    }
    const deviceData = {
      name: deviceName,
      details: device.details,
      storage: storageLocation,
      category: device.category,
      ruleExt: device.ruleExt,
      ruleDur: device.ruleDur,
      launchYr: device.launchYr,
      cost: device.cost,
      state: "Available",
    };
    const confirmAddingDevice = async () => {
      try {
        const jwtToken = await getJwtToken();
        const response = await fetch(`${API_BASE_URL}/addDevice`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(deviceData),
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message || "Failed to add device.");
        }

        Alert.alert("Success", "Device added successfully.", [
          {
            text: "OK",
            onPress: () => fetchDevicesData(),
          },
        ]);
      } catch (err) {
        Alert.alert("Error", err.message || "An error occurred.");
      }
    };

    Alert.alert("Confirmation", "Are you sure you want to add this device?", [
      {
        text: "Yes",
        onPress: confirmAddingDevice,
      },
      {
        text: "No",
        style: "cancel",
      },
    ]);
  };

  const [loanRuleExpanded, setLoanRuleExpanded] = useState(false);
  const [summaryDetailsExpanded, setSummaryDetailsExpanded] = useState(false);
  const [devicesIDExpanded, setDevicesIDExpanded] = useState(false);
  const [loanHistoryExpanded, setLoanHistoryExpanded] = useState(false);

  const toggleLoanRule = () => {
    setLoanRuleExpanded(!loanRuleExpanded);
  };
  const toggleSummaryDetails = () => {
    setSummaryDetailsExpanded(!summaryDetailsExpanded);
  };
  const toggleDevicesID = () => {
    setDevicesIDExpanded(!devicesIDExpanded);
  };
  const toggleLoanHistory = () => {
    setLoanHistoryExpanded(!loanHistoryExpanded);
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.title}>{deviceName}</Text>
        </View>

        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabButton} onPress={toggleLoanRule}>
            <View style={styles.detailLayout}>
              <Text style={[styles.tabButtonText, { flex: 1 }]}>
                Loan Rules
              </Text>
              <Ionicons
                style={{ marginLeft: "auto" }}
                name={loanRuleExpanded ? "chevron-up" : "chevron-down"}
                size={16}
                color={"#AC145A"}
              />
            </View>
          </TouchableOpacity>
          {loanRuleExpanded && (
            <View style={styles.detailRow}>
              <View style={styles.detailRowLayout}>
                <Text style={{ fontWeight: "500", flex: 3 }}>
                  Standard Loan Duration:
                </Text>
                <Text style={{ fontWeight: "300", flex: 1 }}>
                  {device.ruleDur} Days
                </Text>
              </View>
              <View style={styles.detailRowLayout}>
                <Text style={{ fontWeight: "500", flex: 3 }}>
                  Extension Allowance:
                </Text>
                <Text style={{ fontWeight: "300", flex: 1 }}>
                  {parseInt(device.ruleExt) > 1
                    ? device.ruleExt + " Times"
                    : device.ruleExt + " Time"}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.tabBar}>
          <TouchableOpacity
            style={styles.tabButton}
            onPress={toggleSummaryDetails}
          >
            <View style={styles.detailLayout}>
              <Text style={[styles.tabButtonText, { flex: 1 }]}>
                Summary Details
              </Text>
              <Ionicons
                style={{ marginLeft: "auto" }}
                name={summaryDetailsExpanded ? "chevron-up" : "chevron-down"}
                size={16}
                color={"#AC145A"}
              />
            </View>
          </TouchableOpacity>
          {summaryDetailsExpanded && (
            <View style={styles.detailRow}>
              {Object.entries(summaryDetailsUnpacked).map(([key, value]) => (
                <View key={key} style={styles.detailRowLayout}>
                  <Text style={{ fontWeight: "500", flex: 1 }}>{key}:</Text>
                  <Text style={{ fontWeight: "300", flex: 2 }}>{value}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabButton} onPress={toggleDevicesID}>
            <View style={styles.detailLayout}>
              <Text style={[styles.tabButtonText, { flex: 1 }]}>Devices</Text>
              <Ionicons
                style={{ marginLeft: "auto" }}
                name={devicesIDExpanded ? "chevron-up" : "chevron-down"}
                size={16}
                color={"#AC145A"}
              />
            </View>
          </TouchableOpacity>
          {devicesIDExpanded && (
            <View style={styles.detailRow}>
              <View style={styles.detailRowLayout}>
                <Text style={[styles.deviceKey, { flex: 2, paddingLeft: 10 }]}>
                  Device
                </Text>
                <Text
                  style={[
                    styles.deviceKey,
                    { flex: 1, paddingLeft: -10, textAlign: "center" },
                  ]}
                >
                  State
                </Text>
              </View>
              <View style={styles.detailRowLayout}>
                <View style={{ flex: 2 }}>
                  {devices.map((device, index) => (
                    <TouchableOpacity
                      key={device.deviceId}
                      onPress={() =>
                        navigation.navigate("Detail", {
                          deviceID: device.deviceId,
                        })
                      }
                    >
                      <Text style={styles.deviceID}>{`${index + 1}.   ${
                        device.deviceId
                      }`}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={{ flex: 1 }}>
                  {devices.map((device) => (
                    <Text key={device.deviceId} style={styles.deviceState}>
                      {device.state}
                    </Text>
                  ))}
                </View>
              </View>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  paddingTop: 20,
                  alignItems: "center",
                }}
                onPress={() => {
                  setAddModalVisible(true);
                }}
              >
                <Ionicons
                  size={20}
                  color={"#AC145A"}
                  name="add-circle-outline"
                ></Ionicons>
                <Text
                  style={{ color: "#AC145A", paddingLeft: 2, fontSize: 14 }}
                >
                  Add another device
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.tabBar}>
          <TouchableOpacity
            style={styles.tabButton}
            onPress={toggleLoanHistory}
          >
            <View style={styles.detailLayout}>
              <Text style={[styles.tabButtonText, { flex: 1 }]}>
                Loan History
              </Text>
              <Ionicons
                style={{ marginLeft: "auto" }}
                name={loanHistoryExpanded ? "chevron-up" : "chevron-down"}
                size={16}
                color={"#AC145A"}
              />
            </View>
          </TouchableOpacity>
          {loanHistoryExpanded && (
            <View style={styles.detailRow}>
              <View style={styles.detailRowLayout}>
                <Text style={[styles.deviceKey, { flex: 1, paddingLeft: 10 }]}>
                  Device ID
                </Text>
                <Text
                  style={[styles.deviceKey, { flex: 1, textAlign: "center" }]}
                >
                  User ID
                </Text>
                <Text
                  style={[styles.deviceKey, { flex: 1, textAlign: "center" }]}
                >
                  Date
                </Text>
              </View>
              <View style={styles.detailRowLayout}>
                <Text style={styles.historyDeviceID}>
                  {history.map((history) => `${history.deviceId}`).join("\n")}
                </Text>
                <Text style={styles.historyUserID}>
                  {history.map((history) => `${history.userId}`).join("\n")}
                </Text>
                <Text style={[styles.historyState, { flex: 1 }]}>
                  {history.map((history) => `${history.returnDate}`).join("\n")}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={() => {
          setAddModalVisible(false);
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.centeredView}>
            <View style={styles.modalViewQR}>
              <Text style={{ fontSize: 18, marginBottom: 20 }}>
                New storage location
              </Text>

              <TextInput
                style={{
                  width: "90%",
                  maxWidth: "100%",
                  marginBottom: 20,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  backgroundColor: "#ECECEC",
                  borderRadius: 15,
                }}
                multiline={true}
                onChangeText={(text) => setStorageLocation(text)}
                value={storageLocation}
                horizontal={true}
              />

              <Button
                title="Submit"
                onPress={() => {
                  submitDevice();
                  setAddModalVisible(false);
                }}
              />
              <Button
                title="Cancel"
                onPress={() => {
                  setAddModalVisible(false);
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    marginBottom: 100,
  },
  titleView: {
    alignItems: "center",
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  tabBar: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  tabButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#D6D6D6",
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
  detailLayout: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailRow: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  detailRowLayout: {
    flexDirection: "row",
    paddingVertical: 2,
  },

  deviceKey: {
    fontWeight: "500",
    lineHeight: 20,
    fontSize: 16,
  },
  deviceID: {
    fontWeight: "300",
    flex: 2,
    lineHeight: 20,
    textDecorationLine: "underline",
  },
  deviceState: {
    fontWeight: "300",
    flex: 1,
    lineHeight: 20,
    textAlign: "center",
  },

  historyDeviceID: {
    fontWeight: "300",
    flex: 1.1,
    lineHeight: 20,
    textAlign: "left",
  },
  historyUserID: {
    fontWeight: "300",
    flex: 0.6,
    lineHeight: 20,
    textAlign: "center",
  },
  historyState: {
    fontWeight: "300",
    flex: 1,
    lineHeight: 20,
    textAlign: "right",
  },
  centeredView: {
    flex: 1,
    padding: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalViewQR: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

const Stack = createStackNavigator();

/*const GeneralDeviceAdminScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="General"
        component={GeneralDeviceAdmin}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detail" component={DetailDeviceAdmin} />
    </Stack.Navigator>
  );
};*/

export default GeneralDeviceAdminScreen;
