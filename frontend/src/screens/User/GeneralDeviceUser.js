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
import { Alert } from "react-native";

const GeneralDeviceUserScreen = () => {
  //!!! replace :name with variables when dubug finished by Dr. Fu
  const API_BASE_URL = "https://0067team4app.azurewebsites.net/posts";
  const navigation = useNavigation();
  const route = useRoute();
  const deviceName = route.params?.deviceName;
  const Available = route.params?.Available;

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
  const [standardLoanDuration, setStandardLoanDuration] = useState(0);
  const [extensionAllowance, setExtensionAllowance] = useState(0);
  const [deviceId, setDeviceId] = useState(null);

  const fetchDeviceData = async () => {
    try {
      console.log("Fetching device data for:", deviceName);
      const jwtToken = await getJwtToken();
      const response = await axios.get(
        `${API_BASE_URL}/deviceByName/${deviceName}`,
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
        }
      );
      console.log("Received data from API:", response.data);
      setDevice(response.data);

      if (response.data && response.data.ruleDur) {
        setStandardLoanDuration(response.data.ruleDur);
      }
      if (response.data && response.data.ruleExt) {
        setExtensionAllowance(response.data.ruleExt);
      }
      if (response.data && response.data.deviceId) {
        setDeviceId(response.data.deviceId);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDeviceData();
  }, []);

  const reserveDevice = async () => {
    try {
      const jwtToken = await getJwtToken();
      const response = await fetch(`${API_BASE_URL}/createLoan/${deviceId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message ||
            "Failed to reserve the device, please try it later."
        );
      }

      Alert.alert("Success", "Device reserved successfully.");
      navigation.navigate("userDevices");
    } catch (err) {
      Alert.alert("Error", err.message || "An error occurred.");
    }
  };

  const summaryDetailsUnpacked = device ? JSON.parse(device.details) : null;

  const [timeSlot, setTimeSlot] = useState({});

  const fetchAvailabilityData = async () => {
    try {
      const jwtToken = await getJwtToken();
      const response = await axios.get(`${API_BASE_URL}/readManagerSchedule`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      console.log("ReceisetTimeSlotved data from API:", response.data);
      setTimeSlot(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchAvailabilityData();
  }, []);

  const [userTerm, setUserTerm] = useState({});

  const userTerms = async () => {
    try {
      const jwtToken = await getJwtToken();
      const response = await axios.get(`${API_BASE_URL}/readUserTerms`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      //console.log("Received data from API:", response.data);
      setUserTerm(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDeviceData();
    userTerms();
  }, []);

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
      `\nPlease come and collect the device on this week, with in the weekly slots: \n${timeSlot}`,
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
              onPress={reserveDevice}
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
                  {standardLoanDuration} Days
                </Text>
              </View>
              <View style={styles.detailRowLayout}>
                <Text style={{ fontWeight: "500", flex: 2 }}>
                  Extension Allowance:
                </Text>
                <Text style={{ fontWeight: "300", flex: 1 }}>
                  {parseInt(extensionAllowance) > 1
                    ? extensionAllowance + " Times"
                    : extensionAllowance + " Time"}
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
                  {Available} Available
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
              disabled={Available === 0 || Available === "0"}
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
