import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DetailDeviceAdmin from "./DetailDeviceAdmin";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_BASE_URL = "https://0067team4app.azurewebsites.net/posts";


const AdminLoans = () => {
  const [loanTable, setLoanTable] = useState([]);
  const [currentTab, setCurrentTab] = useState("Overdue");
  const [filteredData, setFilteredData] = useState([]);

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

  const fetchData = async () => {
    try {
      const jwtToken = await getJwtToken();
      const response = await axios.get(`${API_BASE_URL}/loans`, {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXBhcnRtZW50IjoiRGVwdCBvZiBDb21wdXRlciBTY2llbmNlIiwiZW1haWwiOiJ1Y2FidGM1QHVjbC5hYy51ayIsImZ1bGxfbmFtZSI6IlRpbW90aHkgQ2hhbiIsImdpdmVuX25hbWUiOiJUaW1vdGh5IiwidXBpIjoidGNoYWExNSIsInNjb3BlTnVtYmVyIjozMCwiYXBpVG9rZW4iOiJ1Y2xhcGktdXNlci1lOTNlOGIyY2ViOWM4M2UtOTc2MTE4OGY5NTQ0MWJmLTJkNmQ2OTIyYjJkZDczZC02MTFlMDdjMGI3ZTliMmUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODI5NDc2NjN9.rOkFIr0pC5MKLIXPLJ1NVzvGkmPy0wZykrMr6GGMhi4` },
      });

      setLoanTable(
        response.data.map((loan) => ({
          id: loan.deviceId,
          name: `Device ${loan.deviceId}`,
          returnDate: loan.dueDate.substring(0, 10),
          user: loan.userId,
          state: new Date(loan.dueDate) >= new Date() ? "Loan" : "Returned",
        }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
  }, [loanTable]);

  const navigation = useNavigation();

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
      <View style={{ paddingBottom: 115 }}>
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
    height: 55,
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
      <Stack.Screen
        name="AdminLoans"
        component={AdminLoans}
        options={{ headerTitle: "Loans" }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailDeviceAdmin}
        options={{ headerTitle: "Device Details" }}
      />
    </Stack.Navigator>
  );
};

export default AdminLoansScreen;