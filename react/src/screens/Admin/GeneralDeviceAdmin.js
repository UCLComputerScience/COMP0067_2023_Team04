import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DetailDeviceAdmin from "./DetailDeviceAdmin";
import { createStackNavigator } from "@react-navigation/stack";

const GeneralDeviceAdmin = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const deviceName = route.params?.deviceName;

  console.log("route.params:", route.params);
  console.log("deviceName:", deviceName);

  const device = [
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

  const devices = [
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
  ];
  const summaryDetailsUnpacked = JSON.parse(device[0].summaryDetails);

  const history = [
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
  ];

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
                  {device[0].standardLoanDuration} Days
                </Text>
              </View>
              <View style={styles.detailRowLayout}>
                <Text style={{ fontWeight: "500", flex: 3 }}>
                  Extension Allowance:
                </Text>
                <Text style={{ fontWeight: "300", flex: 1 }}>
                  {parseInt(device[0].extensionAllowance) > 1
                    ? device[0].extensionAllowance + " Times"
                    : device[0].extensionAllowance + " Time"}
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
                      key={device.id}
                      onPress={() =>
                        navigation.navigate("Detail", { deviceID: device.id })
                      }
                    >
                      <Text style={styles.deviceID}>{device.id}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={{ flex: 1 }}>
                  {devices.map((device) => (
                    <Text key={device.id} style={styles.deviceState}>
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
                  {history.map((history) => `${history.deviceID}`).join("\n")}
                </Text>
                <Text style={styles.historyUserID}>
                  {history.map((history) => `${history.userID}`).join("\n")}
                </Text>
                <Text style={[styles.historyState, { flex: 1 }]}>
                  {history.map((history) => `${history.date}`).join("\n")}
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

const GeneralDeviceAdminScreen = () => {
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
};

export default GeneralDeviceAdminScreen;
