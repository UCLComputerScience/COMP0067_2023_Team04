import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DetailDeviceAdmin from "./DetailDeviceAdmin";

const AdminLoans = () => {
  const loanTable = [
    {
      name: "Lenovo Legion Y9000P 2022 RTX 3070ti",
      user: "ucabj38",
      state: "Available",
      returnDate: "2023-04-21",
      id: 20220901008,
    },
    {
      name: "Lenovo Legion Y9000P 2022 RTX 3080ti",
      user: "ucabj38",
      state: "Loan",
      returnDate: "2023-03-14",
      id: 20220901001,
    },
    {
      name: "Lenovo Legion Y9000P 2022 RTX 3060ti",
      user: "ucabj38",
      state: "Loan",
      returnDate: "2023-03-15",
      id: 20220901002,
    },
    {
      name: "Lenovo Legion Y9000P 2022 RTX 3050ti",
      user: "ucabj38",
      state: "Loan",
      returnDate: "2023-03-16",
      id: 20220901003,
    },
    {
      name: "Lenovo Legion Y9000P 2022 RTX 2070ti",
      user: "ucabj38",
      state: "Loan",
      returnDate: "2023-03-17",
      id: 20220901004,
    },
    {
      name: "Lenovo Legion Y9000P 2022 RTX 4070ti",
      user: "ucabj38",
      state: "Loan",
      returnDate: "2023-03-18",
      id: 20220901005,
    },
    {
      name: "Lenovo Legion Y9000P 2022 RTX 4060ti",
      user: "ucabj38",
      state: "Loan",
      returnDate: "2023-03-19",
      id: 20220901006,
    },
  ];

  const navigation = useNavigation();

  const [currentTab, setCurrentTab] = useState("Overdue");
  const [filteredData, setFilteredData] = useState([]);

  const filterData = (tab) => {
    const filtered = loanTable.filter((item) => {
      const returnDate = new Date(item.returnDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (tab === "Overdue") {
        return item.state === "Loan" && returnDate.getTime() < today.getTime();
      } else {
        return true;
      }
    });
    setFilteredData(filtered);
  };

  const handleTabPress = (tab) => {
    setCurrentTab(tab);
    filterData(tab);
  };
  useEffect(() => {
    filterData(currentTab);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleTabPress("Overdue")}
        >
          <Text
            style={[
              styles.tabButtonText,
              { color: currentTab === "Overdue" ? "#000" : "#ccc" },
            ]}
          >
            Overdue
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleTabPress("All history")}
        >
          <Text
            style={[
              styles.tabButtonText,
              { color: currentTab === "All history" ? "#000" : "#ccc" },
            ]}
          >
            All history
          </Text>
        </TouchableOpacity>
      </View>
      {currentTab === "Overdue" ? (
        <FlatList
          data={filteredData}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Detail", { deviceID: item.id });
                }}
              >
                <View style={styles.line}>
                  <View style={{ flex: 2, alignItems: "flex-start" }}>
                    <Text style={[styles.devices, { textAlign: "left" }]}>
                      {item.name}
                    </Text>
                    <Text style={[styles.user, { textAlign: "center" }]}>
                      User ID: {item.user}
                    </Text>
                  </View>
                  <Text
                    style={[styles.date, { flex: 1.4, textAlign: "center" }]}
                  >
                    {item.returnDate}
                  </Text>
                </View>
                <View style={styles.separator} />
              </TouchableOpacity>
            );
          }}
        />
      ) : currentTab === "All history" ? (
        <FlatList
          data={filteredData}
          renderItem={({ item }) => {
            const returnDate = new Date(item.returnDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const isOverdue =
              item.state === "Loan" && returnDate.getTime() < today.getTime();
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Detail", { deviceID: item.id });
                }}
              >
                <View style={styles.line}>
                  <View style={{ flex: 2, alignItems: "flex-start" }}>
                    <Text style={[styles.devices, { textAlign: "left" }]}>
                      {item.name}
                    </Text>
                    <Text style={[styles.user, { textAlign: "center" }]}>
                      User ID: {item.user}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.date,
                      {
                        flex: 1.4,
                        textAlign: "center",
                        color: isOverdue ? "red" : "black",
                      },
                    ]}
                  >
                    {item.returnDate}
                  </Text>
                </View>
                <View style={styles.separator} />
              </TouchableOpacity>
            );
          }}
        />
      ) : null}
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
    justifyContent: "center",
    marginBottom: 5,
    marginTop: -5,
  },
  tabButton: {
    paddingHorizontal: 60,
    paddingVertical: 5,
  },
  tabButtonText: {
    fontSize: 17,
    fontWeight: 400,
  },
  line: {
    marginVertical: 15,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  devices: {
    fontSize: 16,
    fontWeight: "600",
  },
  date: {
    fontSize: 16,
    fontWeight: "600",
    color: "red",
  },
  user: {
    fontSize: 16,
    fontWeight: "400",
    color: "#898989",
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
  },
});

const Stack = createStackNavigator();

const AdminLoansScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AdminLoans" component={AdminLoans} />
      <Stack.Screen
        name="Detail"
        component={DetailDeviceAdmin}
        options={{ headerTitle: "Device Details" }}
      />
    </Stack.Navigator>
  );
};

export default AdminLoansScreen;
