import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import GeneralDeviceExtendScreen from "./GeneralDeviceExtendScreen";
import GeneralDeviceExtendScreen2 from "./PastDeviceScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import request from "../../utils/request";
import moment from "moment";

const UserLoans = () => {
  const [currentTab, setCurrentTab] = useState("ongoing");
  const [filteredData, setFilteredData] = useState([]);
  const navigation = useNavigation();

  const route = useRoute();
  const data = [
    {
      device: "Lenovo Legion Y9000P 2022 RTX 3070ti",
      dueDate: "2023-03-01",
      borrowDate: "2023-02-15",
    },
    { device: "iPad Pro", dueDate: "2023-04-05", borrowDate: "2023-03-20" },
    { device: "MacBook Air", dueDate: "2023-06-01", borrowDate: "2023-05-20" },
  ];

  const now = new Date();

  const filterData = (tab) => {
    const filtered = data.filter((item) => {
      const dueDate = new Date(item.dueDate);
      if (tab === "ongoing") {
        return dueDate >= now;
      } else {
        return dueDate < now;
      }
    });
    setFilteredData(filtered);
  };

  useState(() => {
    filterData(currentTab);
  }, []);

  const handleTabPress = (tab) => {
    setCurrentTab(tab);
    // filterData(tab);
    getListData(tab);
  };

  const handleRowPress = (item) => {
    if (currentTab === "past") {
      navigation.navigate("General Details(Past)", { item: JSON.stringify(item) });
    } else {
      navigation.navigate("Return & Extend", { item: JSON.stringify(item) });
    }
    // console.log(`Clicked row ${index}`);
  };

  const [listData, setListData] = useState([]);
  const getListData = async (tab) => {
    const userId = 1;
    try {
      const res = await request({
        url: `/posts/loans/loansCurrent/${userId}`,
        method: "get",
      }); 
      console.log("loansCurrent res = ", res); 
      // console.log("cur = ", currentTab);
      if (res) {
        const filtered = res.filter((item) => {
          const dueDate = new Date(item.dueDate);
          if (tab === "ongoing") {
            return dueDate >= now;
          } else { 
            return dueDate < now; 
          }
        });

        setListData(filtered);

        // setDetail(res);
        // setSummary(JSON.parse(res.details));
        // setStatus(res.state);
      }
    } catch (error) {
      console.log("error = ", error);
    }
  };
  useEffect(() => {
    getListData(currentTab);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            currentTab === "ongoing" && styles.activeTabButton,
            { marginLeft: -7 },
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
            currentTab === "past" && styles.activeTabButton,
            { marginRight: 13 },
          ]}
          onPress={() => handleTabPress("past")}
        >
          <Text
            style={[
              styles.tabButtonText,
              { color: currentTab === "past" ? "#000" : "#ccc" },
            ]}
          >
            Past
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.header]}>
        <Text style={[styles.headerText, { flex: 1 }]}>Device</Text>

        {currentTab === "past" && (
          <Text
            style={[
              styles.headerText,
              { flex: 1, textAlign: "right", marginRight: -10 },
            ]}
          >
            Borrow date
          </Text>
        )}
        {currentTab !== "past" && (
          <Text style={[styles.headerText, { flex: 1, textAlign: "right" }]}>
            Due date
          </Text>
        )}
      </View>
      {listData.length === 0 && (
        <Text style={{
          fontSize: 14,
          color: "#666",
          textAlign: 'center'
        }}>
          no data
        </Text>
      )}
      <FlatList
        data={listData}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.dataRow}
            key={index}
            onPress={() => handleRowPress(item)}
          >
            <Text style={[styles.deviceText, { flex: 1 }]}>{item.name}</Text>

            {currentTab === "past" && (
              <Text
                style={[
                  styles.dueDateText,
                  { marginRight: 15, flex: 1, textAlign: "right" },
                ]}
              >
                {moment(item.startDate).format("YYYY-MM-DD HH:mm:ss")}
              </Text>
            )}
            {currentTab !== "past" && (
              <Text
                style={[
                  styles.dueDateText,
                  { marginRight: 15, flex: 1, textAlign: "right" },
                ]}
              >
                {moment(item.dueDate).format("YYYY-MM-DD HH:mm:ss")}
              </Text>
            )}
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
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

  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginLeft: -20,
    marginRight: -20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 60,
  },

  headerText: {
    fontSize: 14,
    color: "#ccc",
  },

  dataContainer: {},

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

const Stack = createStackNavigator();
const UserLoansScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Loans"
        component={UserLoans}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Return & Extend"
        component={GeneralDeviceExtendScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="General Details(Past)"
        component={GeneralDeviceExtendScreen2}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default UserLoansScreen;
