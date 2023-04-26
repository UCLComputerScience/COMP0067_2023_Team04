import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import GeneralDeviceUserScreen from "./GeneralDeviceUser";
import * as Linking from "expo-linking";

// This screen needs to read the reservation status of the user, it needs the name, status and due date of the device that the user has reserved, the status is only two cases, loan or has been returned

const UserAppointmentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const currentScreenPath = route.name;
  const currentScreenUrl = Linking.createURL(currentScreenPath);

  console.log("Current Screen URL:", currentScreenUrl);
  const initialDevices = [
    {
      name: "Lenovo Legion Y9000P 2022 RTX 3070ti",
      status: "Reserved",
      date: "2022-10-25",
    },
    {
      name: "Lenovo Legion Y9000P 2022 RTX 3070",
      status: "Reserved",
      date: "2022-11-25",
    },
    {
      name: "Lenovo Legion Y9000P 2022 RTX 3060",
      status: "Reserved",
      date: "2023-01-25",
    },
    /*{
      name: "Dell XPS 13 2022",
      status: "Return",
      data: "2023-02-25",
    },
    {
      name: "MacBook Pro M1 2021",
      status: "Return",
      data: "2023-03-25",
    },*/
  ];

  const [devices, setDevices] = useState(initialDevices);

  const handleCanel = () => {
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
            Alert.alert("Success", "The reservation is successfully cancelled");
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
              <TouchableOpacity onPress={handleCanel}>
                <View style={styles.line}>
                  <Text
                    style={[styles.devices, { flex: 2, textAlign: "left" }]}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={[
                      styles.devices,
                      { marginLeft: 10, flex: 1, textAlign: "center" },
                    ]}
                  >
                    {item.status}
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
