import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import GeneralDeviceUserScreen from "./GeneralDeviceUser";
import GeneralDeviceExtendScreen from "./GeneralDeviceExtendScreen";
import axios from "axios";
import moment from "moment";

const Stack = createStackNavigator();

const UserLoans = () => {
  const [currentTab, setCurrentTab] = useState("ongoing");
  const [filteredData, setFilteredData] = useState([]);
  const navigation = useNavigation();

  const [listData, setListData] = useState([]);
  const API_BASE_URL = "http://0067team4app.azurewebsites.net/posts";


  const getListData = async () => {
    const userId = 1;
    try {
      const response = await axios.get(
        `${API_BASE_URL}/loans/loansCurrent/${userId}`
      );
      console.log("Received data from API:", response.data);
  
      if (response.data) {
        const mappedData = response.data.map(item => {
          return { ...item, deviceName: item.name };
        });
        setListData(mappedData);
        filterData(currentTab);
      }
    } catch (error) {
      console.log("error = ", error);
    }
  };
  
  
  useEffect(() => {
    getListData();
  }, [currentTab]);
  
  

  const filterData = (tab) => {
    const filtered = listData.filter((item) => {
      if (tab === "ongoing") {
        return item.returnDate === null;
      } else {
        return item.returnDate !== null;
      }
    });
    setFilteredData(filtered);
  };

  const handleTabPress = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            currentTab === "ongoing" && styles.activeTabButton,
          ]}
          onPress={() => handleTabPress("ongoing")}
        >
          <Text
            style={[
              styles.tabButtonText,
              { color: currentTab === "ongoing" ? "#000" : "#ccc" },
            ]}
          >
            Ongoing
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            currentTab === "history" && styles.activeTabButton,
          ]}
          onPress={() => handleTabPress("history")}
        >
          <Text
            style={[
              styles.tabButtonText,
              { color: currentTab === "history" ? "#000" : "#ccc" },
            ]}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.dataRow}
            onPress={() => {
              if (item.returnDate !== null) {
                navigation.navigate("General Device", {
                  deviceName: item.deviceName,
                });
              } else {
                navigation.navigate("Device Extend", {
                  deviceId: item.deviceId,
                  deviceName: item.deviceName,
                });
              }
            }}
          >
            <Text style={[styles.deviceText, { flex: 1 }]}>
              {item.deviceName}
            </Text>
            <Text style={[styles.dueDateText, { flex: 1, textAlign: "right" }]}>
              {moment(item.dueDate).format("DD/MM/YYYY")}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.deviceId.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  tabButton: {
    paddingHorizontal: 60,
    paddingVertical: 5,
  },

  activeTabButton: {},

  tabButtonText: {
    fontSize: 17,
  },

  dataRow: {
    paddingHorizontal: 25,
    flexDirection: "row",
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },

  deviceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    flex: 1,
  },

  dueDateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    flex: 1,
    textAlign: "right",
  },
});

const UserLoansScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Loans"
        component={UserLoans}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="General Device"
        component={GeneralDeviceUserScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Device Extend"
        component={GeneralDeviceExtendScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default UserLoansScreen;
