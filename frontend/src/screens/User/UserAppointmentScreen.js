import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import GeneralDeviceUserScreen from "./GeneralDeviceUser";
import * as Linking from "expo-linking";
import moment from "moment";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

// This screen needs to read the reservation status of the user, it needs the name, status and due date of the device that the user has reserved, the status is only two cases, loan or has been returned

const UserAppointmentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const currentScreenPath = route.name;
  const currentScreenUrl = Linking.createURL(currentScreenPath);
  console.log("Current Screen URL:", currentScreenUrl);
  const [devices, setDevice] = useState([]);

  const API_BASE_URL = "https://0067team4app.azurewebsites.net/posts";

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

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const jwtToken = await getJwtToken();
          const response = await axios.get(`${API_BASE_URL}/reservedUser`, {
            headers: { Authorization: `Bearer ${jwtToken}` },
          });
          const devicesData = response.data.map((device) => ({
            key: device.deviceId,
            name: device.name,
            state: device.state === "Reserved" ? "Pick up" : "Return",
            loanId: device.loanId,
          }));
          setDevice(response.data);
          console.log(devicesData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, [])
  );

  const cancelLoan = async (loanId) => {
    try {
      const jwtToken = await getJwtToken();
      const response = await fetch(
        `${API_BASE_URL}/cancelReservation/${loanId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to cancel.");
      }

      Alert.alert("Success", "Cancel successfully.");
    } catch (err) {
      Alert.alert("Error", err.message || "An error occurred.");
    }
  };

  const handleCanel = (loanId) => {
    Alert.alert(
      "Cancel Reservation",
      "Are you sure you want to cancel this reservation?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            cancelLoan(loanId);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <View
          style={{
            marginVertical: 5,
            paddingHorizontal: 30,
            flexDirection: "row",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", flex: 2 }}>
            <Text style={[styles.header, { textAlign: "center" }]}>
              Devices
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
              marginLeft: 30,
            }}
          >
            <Text style={[styles.header, { textAlign: "right" }]}>status</Text>
          </View>
        </View>
        <FlatList
          data={devices}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => handleCanel(item.loanId)}>
                <View style={styles.line}>
                  <Text
                    style={[styles.devices, { flex: 1.3, textAlign: "left" }]}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={[
                      styles.devices,
                      { marginLeft: 10, flex: 1, textAlign: "center" },
                    ]}
                  >
                    {item.state}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={{ paddingBottom: 170 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchbar: {
    marginTop: 10,
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    alignItems: "center",
  },
  add: {
    marginLeft: 20,
    marginTop: 10,
    padding: 10,
    alignItems: "center",
    flex: 1,
  },
  search: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  list: {
    marginTop: 10,
  },
  line: {
    marginVertical: 15,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#A6AAB2",
  },
  devices: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UserAppointmentScreen;
