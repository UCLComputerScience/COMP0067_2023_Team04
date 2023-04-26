import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import GeneralDeviceUserScreen from "./GeneralDeviceUser";
import request from "../../utils/request";
import moment from "moment";

// This screen needs to read the reservation status of the user, it needs the name, status and due date of the device that the user has reserved, the status is only two cases, loan or has been returned

const AllDevices = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const handleAgreePress = () => {
    console.log("I agree button pressed");
    navigation.navigate("General Details(Reserved)");
  };
  const [input, setInput] = useState("");
  const [listData, setListData] = useState([]);
  const getListData = async () => {
    const userId = 1;
    try {
      const res = await request({
        url: `/posts/loans/reservedUser/${userId}`,
        method: "get",
      });
      console.log("loans res = ", res);
      if (res) {
        setListData(res);
        // setDetail(res);
        // setSummary(JSON.parse(res.details));
        // setStatus(res.state);
      }
    } catch (error) {
      console.log("error = ", error);
    }
  };
  useEffect(() => {
    getListData();
  }, []);

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
          <View
            style={{ flexDirection: "row", alignItems: "center", flex: 2.1 }}
          >
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
            <Text style={[styles.header, { textAlign: "center" }]}>status</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
              marginLeft: 30,
            }}
          >
            <Text style={[styles.header, { textAlign: "center" }]}>data</Text>
          </View>
        </View>
        <FlatList
          data={listData}
          renderItem={({ item }) => {
            if (input === "") {
              return (
                <TouchableOpacity onPress={handleAgreePress}>
                  <View style={styles.line}>
                    <Text
                      style={[styles.devices, { flex: 2.4, textAlign: "left" }]}
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
                    <Text
                      style={[
                        styles.devices,
                        { marginRight: -10, flex: 2, textAlign: "center" },
                      ]}
                    >
                      {moment(item.startDate).format('YYYY-MM-DD HH:mm:ss')}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }
            if (item.name.toLowerCase().includes(input.toLowerCase())) {
              return (
                <View style={styles.line}>
                  <Text
                    style={[styles.devices, { flex: 2, textAlign: "center" }]}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={[styles.devices, { flex: 1, textAlign: "center" }]}
                  >
                    {item.status}
                  </Text>
                  <Text
                    style={[
                      styles.devices,
                      { MARflex: 1, textAlign: "center" },
                    ]}
                  >
                    {item.data}
                  </Text>
                </View>
              );
            }
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

const Stack = createStackNavigator();
const UserAppointmentScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Appointment"
        component={AllDevices}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="General Details(Reserved)"
        component={GeneralDeviceUserScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default UserAppointmentScreen;
