import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import GeneralDeviceAdmin from "./GeneralDeviceAdmin";
import StatisticsAdmin from "./StatisticsAdmin";
import RegisterDeviceScreen from "./RegisterDeviceScreen";
import DetailDeviceAdmin from "./DetailDeviceAdmin";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const AllDevices = () => {
  const API_BASE_URL = "https://0067team4app.azurewebsites.net/posts";

  const navigation = useNavigation();

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

  const processData = (data) => {
    return data.map((item) => ({
      name: item.name,
      category: item.category,
      loaned: item.num_loaned,
      available: item.num_available,
    }));
  };

  const fetchData = async () => {
    try {
      const jwtToken = await getJwtToken();
      if (jwtToken) {
        console.log("正在使用 JWT token 发送请求:", jwtToken);
        const response = await axios.get(`${API_BASE_URL}/nameAvailability`, {
          headers: { Authorization: `Bearer ${jwtToken}` },
        });

        if (response) {
          console.log("成功获取数据:", response.data);
        } else {
          console.log("请求成功，但没有返回数据");
        }

        setDevices(processData(response.data));
        setFilteredDevices(processData(response.data));
      } else {
        console.log("由于缺少 JWT token，未能发送请求");
      }
    } catch (error) {
      console.error("获取数据时出错:", error);
      if (error.response) {
        console.log("服务器响应状态码:", error.response.status);
        console.log("服务器响应数据:", error.response.data);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [input, setInput] = useState("");
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
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
      setFilteredDevices(devices);
    } else {
      const filteredDevices = devices.filter(
        (devices) => devices.category === category
      );
      setFilteredDevices(filteredDevices);
    }
  };

  useEffect(() => {
    filterDevicesByCategory();
  }, []);

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
            onPress={() => navigation.navigate("AddDevice")}
          >
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
          {[
            "All",
            "Laptop",
            "MacBook",
            "Android",
            "iPhone",
            "CPU",
            "GPU",
            "Others",
          ].map((category, index) => (
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
          ))}
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
            data={filteredDevices}
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
      <Stack.Screen
        name="Devices"
        options={{ headerShown: false }}
        component={AllDevices}
      />
      <Stack.Screen
        name={"GeneralDeviceAdmin"}
        component={GeneralDeviceAdmin}
        options={{ headerTitle: "Device Details", headerShown: false }}
        //options={({ route }) => ({ title: route.params.deviceName })}
        //options={({ route }) => ({ title: "Device details" })}
      />
      <Stack.Screen
        name="Statistics"
        options={{ headerShown: false }}
        component={StatisticsAdmin}
      />
      <Stack.Screen
        name="AddDevice"
        options={{ headerShown: false }}
        component={RegisterDeviceScreen}
      />
      <Stack.Screen
        name="Detail"
        options={{ headerShown: false }}
        component={DetailDeviceAdmin}
      />
    </Stack.Navigator>
  );
};

export default AdminDevicesScreen;
