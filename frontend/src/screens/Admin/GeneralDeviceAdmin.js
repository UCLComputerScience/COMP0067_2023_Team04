import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DetailDeviceAdmin from "./DetailDeviceAdmin";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";

const GeneralDeviceAdminScreen = () => {
  //!!! replace :name with variables when dubug finished by Dr. Fu
  const API_BASE_URL = "http://0067team4app.azurewebsites.net/posts";
  const navigation = useNavigation();
  const route = useRoute();
  const deviceName = route.params?.deviceName;

  console.log("route.params:", route.params);
  console.log("deviceName:", deviceName);

  //Device info, still need to work on it\

  //Devices list from DB, successful
  const [device, setDevice] = useState("");
  const fetchDeviceData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/details/Lenovo Legion Y9000P 2022 RTX 3070ti`
      );
      console.log("Received data from API:", response.data);
      setDevice(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchDeviceData();
  }, []);

  const summaryDetailsUnpacked = device ? JSON.parse(device.details) : null;

  /*const device = [
    {
      standardLoanDuration: 14,
      extensionAllowance: 1,
      summaryDetails:
        '{"CPU": "Intel Core i9-12900H Octo-core 20 threads", \
                      "GPU": "RTX 3070ti 8G 150W", \
                      "Memory": "DDR5 16GB 4800Hz Dual", \
                      "SSD": "SAMSUNG PM9A1 512GB", \
                      "Screen": "2.5K (2560*1600) 16:10 165Hz", \
                      "Power": "300W", \
                      "WIFI": "AX211"}',
    },
  ];
  //const summaryDetailsUnpacked = JSON.parse(device[0].summaryDetails);*/

  //Devices list from DB, successful
  const [devices, setDevices] = useState({});
  const fetchDevicesData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/idByName/Lenovo Legion Y9000P 2022 RTX 3070ti`
      );
      //console.log("Received data from API:", response.data);
      setDevices(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchDevicesData();
  }, []);

  //The ids of a same device
  /*const devices = [
    { id: 20220901001, state: "Loaned" },
    { id: 20220901002, state: "Available" },
    { id: 20220901003, state: "Maintained" },
    { id: 20220901004, state: "Loaned" },
    { id: 20220901005, state: "Loaned" },
    { id: 20220901006, state: "Available" },
    { id: 20220901007, state: "Loaned" },
    { id: 20220901008, state: "Available" },
    { id: 20220901009, state: "Available" },
    { id: 20220901010, state: "Loaned" },
    { id: 20220901011, state: "Available" },
    { id: 20220901012, state: "Available" },
  ];*/

  //Devices list from DB, successful
  const [history, setHistory] = useState({});
  const fetchHistoryData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/loansHistoryByName/Lenovo Legion Y9000P 2022 RTX 3070ti`
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

  /*const history = [
    {
      deviceID: 20220901001,
      userID: "ucabcda",
      date: "2023-03-21",
    },
    {
      deviceID: 20220901001,
      userID: "ucabccb",
      date: "2023-03-20",
    },
    {
      deviceID: 20220901002,
      userID: "ucabcdb",
      date: "2023-03-20",
    },
    {
      deviceID: 20220901003,
      userID: "ucabcdc",
      date: "2023-03-19",
    },
  ];*/

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
                  {devices.map((device) => (
                    <TouchableOpacity
                      key={device.deviceId}
                      onPress={() =>
                        navigation.navigate("Detail", {
                          deviceID: device.deviceId,
                        })
                      }
                    >
                      <Text style={styles.deviceID}>{device.deviceId}</Text>
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
