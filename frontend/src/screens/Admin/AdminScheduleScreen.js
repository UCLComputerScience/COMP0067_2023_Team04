import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DetailDeviceAdmin from "./DetailDeviceAdmin";
import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";
import axios from "axios";



const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const Stack = createStackNavigator();

const CollapsibleList = () => {
  const route = useRoute();
  const currentScreenPath = route.name;
  const currentScreenUrl = Linking.createURL(currentScreenPath);

  useEffect(() => {
    console.log("Current Screen URL:", currentScreenUrl);
  }, []);
    const [currentTab, setCurrentTab] = useState("today");
  const navigation = useNavigation();
  const [filteredData, setFilteredData] = useState([]);
  const [expandedDays, setExpandedDays] = useState([]);

  const handleExpand = (day) => {
    if (expandedDays.includes(day)) {
      setExpandedDays(expandedDays.filter((d) => d !== day));
    } else {
      setExpandedDays([...expandedDays, day]);
    }
  };
  /*please notice. We only load this week data*/
  //device with state 'reserved' or ('loan' && 'duedate < friday'
  /*please notice. We only load this week data*/

  const [loanTable, setLoanTable] = useState([]);

  const API_BASE_URL = "https://0067team4app.azurewebsites.net/posts";

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

  const fetchData = async (jwtToken) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/schedule`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
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
    const fetchDataWithJwtToken = async () => {
      const jwtToken = await getJwtToken();
      fetchData(jwtToken);
    };
  
    fetchDataWithJwtToken();
  }, []);



  const now = new Date();

  const filterData = (tab) => {
    const filtered = loanTable.filter((item) => {
      const startDate = new Date(item.startDate);
      const weekStart = new Date(
        now.getTime() - ((now.getDay() || 7) - 1) * 24 * 60 * 60 * 1000
      );
      const endDate = new Date(
        now.getTime() + (7 - now.getDay()) * 24 * 60 * 60 * 1000
      );
      if (tab === "today") {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return startDate.getTime() === today.getTime();
      } else {
        return startDate >= weekStart && startDate <= endDate;
      }
    });
    setFilteredData(filtered);
  };


  

  const handleTabPress = (tab) => {
    setCurrentTab(tab);
    filterData(tab);
  };

  const handleRowPress = (item) => {
    navigation.navigate("Detail", {
      user: item.user,
      state: item.state,
      startDate: item.startDate,
    });
  };

  const groupedLoans = loanTable.reduce((acc, loan) => {
    const date = new Date(loan.startDate);
    const day = DAYS[date.getUTCDay() - 1];

    if (!acc[day]) {
      acc[day] = [];
    }

    acc[day].push(loan);

    return acc;
  }, {});

  const today = new Date();
  const currentDayIndex = today.getUTCDay() - 1;

  const remainingDays =
    now.getUTCDay() === 0 ? DAYS : DAYS.slice(currentDayIndex + 1);

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            currentTab === "today" && styles.activeTabButton,
            { marginLeft: -7 },
          ]}
          onPress={() => handleTabPress("today")}
        >
          <Text
            style={[
              styles.tabButtonText,
              { color: currentTab === "today" ? "#000" : "#ccc" },
            ]}
          >
            Today
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            currentTab === "thisWeek" && styles.activeTabButton,
            { marginRight: 13 },
          ]}
          onPress={() => handleTabPress("thisWeek")}
        >
          <Text
            style={[
              styles.tabButtonText,
              { color: currentTab === "thisWeek" ? "#000" : "#ccc" },
            ]}
          >
            This week
          </Text>
        </TouchableOpacity>
      </View>

      {currentTab === "today" ? (
        <FlatList
          style={styles.dataContainer}
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({
            item,
            index,
            separators = {
              highlight: () => {},
              unhighlight: () => {},
              marginLeft: -25,
              marginRight: -25,
            },
          }) => (
            <TouchableOpacity
              style={[styles.dataRow, { marginLeft: 0, marginRight: 0 }]}
              onPress={() => handleRowPress(index)}
            >
              <Text style={[styles.deviceText, { flex: 2 }]}>{item.name}</Text>
              <Text style={[styles.userText, { flex: 1, textAlign: "center" }]}>
                {item.user}
              </Text>
              <Text
                style={[styles.stateText, { flex: 0.7, textAlign: "center" }]}
              >
                {item.state}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : currentTab === "thisWeek" ? (
        <ScrollView
          style={styles.containerC}
          contentInset={{ top: 0, bottom: 90 }}
        >
          <View style={styles.tabBarC}>
            {remainingDays.map((day) => (
              <View key={day}>
                <TouchableOpacity
                  style={[
                    styles.tabButtonC,
                    expandedDays.includes(day) && styles.activeTabButton,
                  ]}
                  onPress={() => handleExpand(day)}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={[styles.tabButtonTextC, { flex: 1 }]}>
                      {day}
                    </Text>
                    <Ionicons
                      style={{ marginLeft: "auto" }}
                      name={
                        expandedDays.includes(day)
                          ? "chevron-up"
                          : "chevron-down"
                      }
                      size={25}
                      color={"#AC145A"}
                    />
                  </View>
                </TouchableOpacity>
                {expandedDays.includes(day) && groupedLoans[day] && (
                  <View style={styles.dataContainer}>
                    {groupedLoans[day] &&
                      groupedLoans[day].map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.dataRow}
                          onPress={() => handleRowPress(index)}
                        >
                          <Text style={[styles.deviceText, { flex: 2 }]}>
                            {item.name}
                          </Text>
                          <Text
                            style={[
                              styles.userText,
                              { flex: 1, textAlign: "center" },
                            ]}
                          >
                            {item.user}
                          </Text>
                          <Text
                            style={[
                              styles.stateText,
                              { flex: 0.7, textAlign: "center" },
                            ]}
                          >
                            {item.state}
                          </Text>
                        </TouchableOpacity>
                      ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
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
    justifyContent: "space-between",
    marginBottom: 5,
    marginTop: -5,
  },

  tabButton: {
    paddingHorizontal: 60,
    paddingVertical: 5,
  },

  activeTabButton: {},

  tabButtonText: {
    fontSize: 17,
  },

  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginLeft: -25,
    marginRight: -25,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 30,
  },

  headerText: {
    fontSize: 14,
    color: "#ccc",
  },

  dataContainer: {},

  dataRow: {
    paddingHorizontal: 25,
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "left",
  },

  dayBar: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: -25,
  },

  deviceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    flex: 1,
  },

  userText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    flex: 1,
    textAlign: "right",
  },

  stateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    flex: 1,
    textAlign: "right",
  },

  containerC: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },

  tabBarC: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 5,
    marginTop: -5,
  },
  tabButtonC: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  tabButtonTextC: {
    fontSize: 22,
    fontWeight: "500",
  },
});

const AdminScheduleScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Schedule" component={CollapsibleList} />
      <Stack.Screen name="Detail" component={DetailDeviceAdmin} />
    </Stack.Navigator>
  );
};

export default AdminScheduleScreen;
