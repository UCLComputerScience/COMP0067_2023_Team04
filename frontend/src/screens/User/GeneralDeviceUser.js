import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

const GeneralDeviceUserScreen = () => {
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
        console.log("JWT token 获取成功:", jwtToken);
        return jwtToken;
      } else {
        console.log("未找到 JWT token");
        return null;
      }
    } catch (error) {
      console.log("JWT token 获取失败:", error);
      return null;
    }
  }


  //Devices list from DB, successful
  const [device, setDevice] = useState("");
  const fetchDeviceData = async () => {
    try {
      console.log("Fetching device data for:", deviceName);
      const jwtToken = await getJwtToken();
      const response = await axios.get(`${API_BASE_URL}/details/${deviceName}`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });      
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

  const [devices, setDevices] = useState({});

  const fetchDevicesData = async () => {
    try {
      console.log("Fetching devices data for:", deviceName);
      const jwtToken = await getJwtToken();
      const response = await axios.get(`${API_BASE_URL}/idByName/${deviceName}`, {
          headers: { Authorization: `Bearer ${jwtToken}` },
        });
      console.log("Received data from API:", response.data);
      setDevices(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchDevicesData();
  }, []);

  const timeSlot = [
    "Monday: 10:00 - 12:00",
    "Tuesday: 09:00 - 12:30",
    "Wednesday: 10:00 - 14:00",
    "Thursday: 14:00 - 16:00",
    "Friday: 13:00 - 14:00",
  ];

  const userTerm = [
    "By borrowing a device from this lending system, I agree to the following terms:\n\n\
1. I will use the device solely for its intended purpose and will not use it for any illegal or unauthorized activity.\n\
2. I will not modify, tamper with, or attempt to repair the device in any way.\n\
3. I will take reasonable care of the device and protect it from damage or theft.\n\
4. I will return the device by the agreed-upon date and time in the same condition as when I borrowed it.\n\
5. I will be responsible for any loss, damage, or theft that occurs while the device is in my possession.\n\
6. I will not share the device with others or lend it to anyone else without permission from the lending system.\n\
7. I understand that failure to comply with these terms may result in a revocation of my borrowing privileges and may also result in legal action.\n\n\
By agreeing to these terms, I acknowledge that I have read and understand them, and I agree to abide by them while borrowing a device from this lending system.",
  ];

  const loanDevie = () => {};

  const [loanRuleExpanded, setLoanRuleExpanded] = useState(false);
  const [summaryDetailsExpanded, setSummaryDetailsExpanded] = useState(false);
  const [devicesIDExpanded, setDevicesIDExpanded] = useState(false);
  const [userTermsModalVisible, setUserTermsModalVisible] = useState(false);

  const toggleLoanRule = () => {
    setLoanRuleExpanded(!loanRuleExpanded);
  };
  const toggleSummaryDetails = () => {
    setSummaryDetailsExpanded(!summaryDetailsExpanded);
  };
  const toggleDevicesID = () => {
    setDevicesIDExpanded(!devicesIDExpanded);
  };

  const showAvailableDatesAlert = () => {
    Alert.alert(
      "Time slots",
      `\nPlease come and collect the device on this week, with in the weekly slots: \n${timeSlot
        .map((day) => `${day}\n`)
        .join("")}`,
      [
        {
          text: "Reserve",
          onPress: () => {
            setUserTermsModalVisible(true);
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={userTermsModalVisible}
        onRequestClose={() => {
          setUserTermsModalVisible(false);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            paddingTop: "10%",
          }}
        >
          <View style={[styles.modalView, { width: "100%", height: "100%" }]}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: "black",
                  fontWeight: 700,
                  flex: 1,
                }}
              >
                User Terms
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setUserTermsModalVisible(false);
                }}
              >
                <Ionicons
                  size={16}
                  style={{ flex: 1 }}
                  name="close-circle-outline"
                  color={"#AC145A"}
                />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.userTermsContent}>
              <Text>{userTerm}</Text>
            </ScrollView>
            <TouchableOpacity
              style={[styles.modalButtonNoBorder, { marginTop: 2 }]}
              onPress={() => {
                setUserTermsModalVisible(false);
                loanDevie;
                Alert.alert(
                  "Success",
                  "You have successfully reserve a device"
                );
              }}
            >
              <Text style={styles.modalCancelButtonText}>I agree</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.container} contentInset={{ bottom: 100 }}>
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
                <Text style={{ fontWeight: "500", flex: 2 }}>
                  Standard Loan Duration:
                </Text>
                <Text style={{ fontWeight: "300", flex: 1 }}>
                  {device[0].standardLoanDuration} Days
                </Text>
              </View>
              <View style={styles.detailRowLayout}>
                <Text style={{ fontWeight: "500", flex: 2 }}>
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
              <Text style={[styles.tabButtonText, { flex: 1 }]}>
                Loan options
              </Text>
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
                <Text style={{ fontWeight: "500", flex: 2 }}>Status:</Text>
                <Text style={{ fontWeight: "300", flex: 1 }}>
                  {devices.available} Available
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={{ paddingTop: 80 }}>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#EEEEEF",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 15,
                width: "70%",
                height: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={showAvailableDatesAlert}
              disabled={available === 0 || available === "0"}
            >
              <Text
                style={{
                  color: "#AC145A",
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                Reserve
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: -10,
    color: "black",
  },
  modalSection: {
    width: "100%",
  },
  modalButton: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
    borderTopWidth: 0,
  },
  modalButtonText: {
    color: "#AC145A",
    fontSize: 18,
    fontWeight: "normal",
    padding: 5,
  },
  modalButtonNoBorder: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  modalDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#D6D6D6",
    width: "127%",
    alignSelf: "center",
    marginVertical: 5,
  },
  modalCancelButtonText: {
    color: "#AC145A",
    fontSize: 22,
    fontWeight: "normal",
    marginTop: -20,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    width: Dimensions.get("window").width * 0.6,
    borderRadius: 10,
    marginLeft: 60,
    marginTop: 100,
  },
  reserveButton: {
    alignItems: "center",
    backgroundColor: "#EBEDEF",
    borderRadius: 10,
    padding: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: "80%",
  },
  reserveButtonDisabled: {
    backgroundColor: "#D6D6D6",
  },
  reserveButtonText: {
    color: "#AC145A",
    fontSize: 18,
    fontWeight: "bold",
  },
  reserveButtonTextDisabled: {
    color: "#8C8C8C",
  },
});

const Stack = createStackNavigator();

export default GeneralDeviceUserScreen;
