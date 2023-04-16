import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import GeneralDeviceAdmin from "./GeneralDeviceAdmin";
import StatisticsAdmin from "./StatisticsAdmin";
import RegisterNewDevice from "./RegisterNewDevice";

const AllDevices = () => {
  const navigation = useNavigation();
  const initialDevices = [
    {
      name: "Lenovo Legion Y9000P 2022 RTX 3070ti",
      loaned: "10",
      available: "5",
      category: "Laptop",
    },
    {
      name: "Lenovo Legion Y9000P 2022 RTX 3070",
      loaned: "6",
      available: "9",
      category: "Laptop",
    },
    {
      name: "Lenovo Legion Y9000P 2022 RTX 3060",
      loaned: "3",
      available: "8",
      category: "Laptop",
    },
    {
      name: "Dell XPS 13 2022",
      loaned: "2",
      available: "3",
      category: "Laptop",
    },
    {
      name: "MacBook Pro M1 2021",
      loaned: "5",
      available: "7",
      category: "MacBook",
    },
    {
      name: "ASUS ROG Zephyrus S GX701",
      loaned: "4",
      available: "2",
      category: "Laptop",
    },
    {
      name: "Lenovo Legion Y740",
      loaned: "6",
      available: "4",
      category: "Laptop",
    },
    {
      name: "Acer Predator Helios 300",
      loaned: "7",
      available: "3",
      category: "Laptop",
    },
    {
      name: "MSI GE76 Raider",
      loaned: "2",
      available: "8",
      category: "Laptop",
    },
    {
      name: "Razer Blade Pro 17",
      loaned: "1",
      available: "9",
      category: "Laptop",
    },
    {
      name: "Alienware m15 R4",
      loaned: "4",
      available: "6",
      category: "Laptop",
    },
    {
      name: "HP Spectre x360",
      loaned: "0",
      available: "10",
      category: "Laptop",
    },
    {
      name: "iPhone 14 Pro Max",
      loaned: "3",
      available: "10",
      category: "iPhone",
    },
    {
      name: "AMD Ryzen 9 5950X CPU",
      loaned: "2",
      available: "8",
      category: "CPU",
    },
    {
      name: "NVIDIA GeForce RTX 3080 GPU",
      loaned: "5",
      available: "3",
      category: "GPU",
    },
    {
      name: "Samsung Galaxy S21 Ultra",
      loaned: "1",
      available: "9",
      category: "Android",
    },
    {
      name: "Intel Core i9-11900K CPU",
      loaned: "3",
      available: "7",
      category: "CPU",
    },
    {
      name: "ASUS ROG Strix RTX 3070 GPU",
      loaned: "4",
      available: "4",
      category: "GPU",
    },
    {
      name: "Google Pixel 6 Pro",
      loaned: "2",
      available: "8",
      category: "Android",
    },
  ];

  const [input, setInput] = useState("");
  const [devices, setDevices] = useState(initialDevices);
  const [sortOrder, setSortOrder] = useState("asc");
  const [loanedSortOrder, setLoanedSortOrder] = useState("asc");
  const [availableSortOrder, setAvailableSortOrder] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState("All");

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
        return a.loaned - b.loaned;
      } else {
        return b.loaned - a.loaned;
      }
    });
    setDevices(sortedDevices);
  };

  const sortDevicesByAvailable = (order) => {
    const sortedDevices = [...devices].sort((a, b) => {
      if (order === "asc") {
        return a.available - b.available;
      } else {
        return b.available - a.available;
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={styles.searchbar}>
            <Icon name="search" size={20} color="#000" />
            <TextInput
              value={input}
              onChangeText={(text) => setInput(text)}
              style={{ fontSize: 15 }}
              placeholder="Search"
            />
          </View>
          <TouchableOpacity 
            style={styles.add}
            onPress={() => navigation.navigate("AddDevice")}>
            <Ionicons size={25} name="add-circle-outline" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.add}
            onPress={() => navigation.navigate("Statistics")}
          >
            <Ionicons size={25} name="stats-chart-outline" />
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
            style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
          >
            <Text style={[styles.header, { textAlign: "center" }]}>Loaned</Text>
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
            style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
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

        <View style={{ paddingBottom: 80 }}>
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
                      navigation.navigate("GeneralDeviceAdmin", {
                        deviceName: item.name,
                      })
                    }
                  >
                    <View style={styles.line}>
                      <Text
                        style={[
                          styles.devices,
                          { flex: 2.4, textAlign: "left" },
                        ]}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={[
                          styles.devices,
                          { flex: 1, textAlign: "center" },
                        ]}
                      >
                        {item.loaned}
                      </Text>
                      <Text
                        style={[
                          styles.devices,
                          { flex: 1, textAlign: "center" },
                        ]}
                      >
                        {item.available}
                      </Text>
                    </View>
                    <View style={styles.separator} />
                  </TouchableOpacity>
                );
              }
            }}
            contentContainerStyle={{ paddingBottom: 170 }}
          />
        </View>
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
    flex: 1,
    paddingTop: 10,
    paddingLeft: 10,
  },
  list: {
    marginTop: 10,
  },
  line: {
    marginVertical: 15,
    paddingHorizontal: 30,
    flexDirection: "row",
    height: 40,
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
  separator: {
    height: 1,
    width: "90%",
    backgroundColor: "#EEEEEF",
    alignSelf: "center",
  },
});

const Stack = createStackNavigator();

const AdminDevicesScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Devices" component={AllDevices} />
      <Stack.Screen
        name={"GeneralDeviceAdmin"}
        component={GeneralDeviceAdmin}
        options={{ headerTitle: "Device Details" }}
        //options={({ route }) => ({ title: route.params.deviceName })}
        //options={({ route }) => ({ title: "Device details" })}
      />
      <Stack.Screen name="Statistics" component={StatisticsAdmin} />
      <Stack.Screen name="AddDevice" component={RegisterNewDevice} />
    </Stack.Navigator>
  );
};

export default AdminDevicesScreen;
