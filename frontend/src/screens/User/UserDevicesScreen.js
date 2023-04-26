import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import GeneralDeviceUser from "./GeneralDeviceUser";
import request from "../../utils/request";

//This screen needs to read the model number, shelf date, number of available rentals, and name of all available rental devices
//Note! The number of devices available in the database is 0 should not appear!

const AllDevices = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const route = useRoute();
  const handleicon = () => {
    Alert.alert(
      "Contact information",
      "Email: uclcsdevice@ucl.ac.uk\nPhone: +44 07412356987\nAddress: MP Engineering Building",
      [
        {
          text: "YES",
          onPress: () => console.log("YES Pressed"),
          style: "cancel",
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  const [input, setInput] = useState("");
  const [initialDevices, setInitialDevices] = useState([]);
  const [devices, setDevices] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [loanedSortOrder, setLoanedSortOrder] = useState("asc");
  const [availableSortOrder, setAvailableSortOrder] = useState("asc");

  const getDevices = async () => {
    const res = await request({
      url: "/posts/user/devices/nameAvailabilityUser",
      method: "get",
    });
    console.log("res = ", res);
    setInitialDevices(res);
    setDevices(res);
  };
  useEffect(() => {
    getDevices();
  }, []);

  const sortDevices = (order) => {
    const sortedDevices = [...devices].sort((a, b) => {
      if (order === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setDevices(sortedDevices);
  };

  const sortDevicesByLoaned = (order) => {
    const sortedDevices = [...devices].sort((a, b) => {
      if (order === "asc") {
        return a.launchYr - b.launchYr;
      } else {
        return b.launchYr - a.launchYr;
      }
    });
    setDevices(sortedDevices);
  };

  const sortDevicesByAvailable = (order) => {
    const sortedDevices = [...devices].sort((a, b) => {
      if (order === "asc") {
        return a.num_available - b.num_available;
      } else {
        return b.num_available - a.num_available;
      }
    });
    setDevices(sortedDevices);
  };

  const handleLoanedSort = () => {
    const newSortOrder = loanedSortOrder === "asc" ? "desc" : "asc";
    setLoanedSortOrder(newSortOrder);
    sortDevicesByLoaned(newSortOrder);
  };

  const handleAvailableSort = () => {
    const newSortOrder = availableSortOrder === "asc" ? "desc" : "asc";
    setAvailableSortOrder(newSortOrder);
    sortDevicesByAvailable(newSortOrder);
  };

  const filterDevicesByCategory = (category) => {
    if (category === "All") {
      setDevices(initialDevices);
    } else {
      const filteredDevices = initialDevices.filter(
        (device) => device.category === category
      );
      setDevices(filteredDevices);
    }
  };

  const handleCategoryTabPress = (category) => {
    setSelectedCategory(category);
    filterDevicesByCategory(category);
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.searchbar}>
            <Icon name="search" size={20} color="#000" />
            <TextInput
              value={input}
              onChangeText={(text) => setInput(text)}
              style={{ fontSize: 15 }}
              placeholder="Search"
            />
          </View>
          <TouchableOpacity onPress={handleicon}>
            <Ionicons
              style={styles.add}
              size={25}
              name="information-circle-outline"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.categoryTabs}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {["All", "Laptop", "MacBook", "Android", "iPhone", "CPU", "GPU"].map(
            (category, index) => (
              <TouchableOpacity
                key={category}
                onPress={() => handleCategoryTabPress(category)}
                style={[
                  styles.categoryTab,
                  selectedCategory === category
                    ? styles.selectedCategoryTab
                    : null,
                ]}
              >
                <Text
                  style={[
                    styles.categoryTabText,
                    selectedCategory === category
                      ? styles.selectedCategoryTabText
                      : null,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      </View>

      <View style={styles.list}>
        <View
          style={{
            marginVertical: 5,
            paddingHorizontal: 30,
            flexDirection: "row",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", flex: 3 }}>
            <Text style={[styles.header, { textAlign: "left" }]}>Devices</Text>
          </View>
          <TouchableOpacity
            onPress={handleLoanedSort}
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
              marginLeft: 20,
            }}
          >
            <Text style={[styles.header, { textAlign: "center" }]}>
              Launch year
            </Text>
            <Ionicons
              name={`chevron-${
                loanedSortOrder === "asc" ? "up" : "down"
              }-outline`}
              size={15}
              color="#AC145A"
              style={{ marginHorizontal: 0 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAvailableSort}
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
              marginLeft: 30,
            }}
          >
            <Text style={[styles.header, { textAlign: "center" }]}>
              Available
            </Text>
            <Ionicons
              name={`chevron-${
                availableSortOrder === "asc" ? "up" : "down"
              }-outline`}
              size={15}
              color="#AC145A"
              style={{ marginHorizontal: 0 }}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={devices}
          renderItem={({ item }) => {
            if (
              input === "" ||
              item.name.toLowerCase().includes(input.toLowerCase())
            ) {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("General Details", {
                      deviceName: item.name,
                      deviceAvailable: item.num_available,
                      deviceId: item.deviceId,
                    })
                  }
                >
                  <View style={styles.line}>
                    <Text
                      style={[styles.devices, { flex: 2.4, textAlign: "left" }]}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={[
                        styles.devices,
                        { marginLeft: -20, flex: 1, textAlign: "center" },
                      ]}
                    >
                      {item.launchYr}
                    </Text>
                    <Text
                      style={[
                        styles.devices,
                        { marginRight: -5, flex: 0.9, textAlign: "center" },
                      ]}
                    >
                      {item.num_available}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }
          }}
          contentContainerStyle={{ paddingBottom: 170 }}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
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
  categoryTabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  categoryTab: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  selectedCategoryTab: {},
  categoryTabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#A6AAB2",
  },
  selectedCategoryTabText: {
    color: "#000",
  },
  line: {
    marginVertical: 15,
    paddingHorizontal: 30,
    flexDirection: "row",
    height: 40,
    alignItems: "center",
  },
  separator: {
    height: 1,
    width: "90%",
    backgroundColor: "#EEEEEF",
    alignSelf: "center",
  },
});

const Stack = createStackNavigator();
const UserDevicesScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Devices"
        component={AllDevices}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="General Details"
        component={GeneralDeviceUser}
        options={{ headerShown: true, headerTitle: "Details" }}
      />
    </Stack.Navigator>
  );
};

export default UserDevicesScreen;