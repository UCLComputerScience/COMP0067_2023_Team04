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
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DetailDeviceAdmin from "./DetailDeviceAdmin";
import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

const Stack = createStackNavigator();

const CollapsibleList = () => {
  const route = useRoute();
  const currentScreenPath = route.name;
  const currentScreenUrl = Linking.createURL(currentScreenPath);

  useEffect(() => {
    console.log("Current Screen URL:", currentScreenUrl);
  }, []);

  const navigation = useNavigation();
  const [loanTable, setLoanTable] = useState([]);

  const API_BASE_URL = "https://0067team4app.azurewebsites.net/posts";

  async function getJwtToken() {
    await new Promise((resolve) => setTimeout(resolve, 300));
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
  useEffect(() => {
    getJwtToken();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        async function getJwtToken() {
          await new Promise((resolve) => setTimeout(resolve, 500));
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
        try {
          const jwtToken = await getJwtToken();
          const response = await axios.get(`${API_BASE_URL}/schedule`, {
            headers: { Authorization: `Bearer ${jwtToken}` },
          });

          setLoanTable(
            response.data.map((loan) => ({
              id: loan.deviceId,
              user: loan.userId,
              state: getLoanState(loan.state),
            }))
          );
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        console.log("API Response:", response.data);
      };

      fetchData();
    }, [])
  );

  const getLoanState = (loanState) => {
    switch (loanState) {
      case "Loaned":
        return "Return";
      case "Reserved":
        return "Pick up";
      case "Available" || "Loaned":
        return "Finish";
      default:
        return loanState;
    }
  };

  useEffect(() => {
    const fetchDataWithJwtToken = async () => {
      const jwtToken = await getJwtToken();
      fetchData(jwtToken);
    };

    fetchDataWithJwtToken();
  }, []);

  const handleRowPress = (item) => {
    console.log("Selected device ID:", item.id);
    navigation.navigate("Detail", {
      deviceID: item.id,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.dataContainer}
        data={loanTable}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.dataRow}
            onPress={() => handleRowPress(item)}
          >
            <Text style={[styles.deviceText, { flex: 2 }]}>{item.id}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

  dataContainer: {},

  dataRow: {
    paddingHorizontal: 25,
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "flex-start",
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
});

const AdminScheduleScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Schedule"
        options={{ headerShown: false }}
        component={CollapsibleList}
      />
      <Stack.Screen
        name="Detail"
        options={{ headerShown: false }}
        component={DetailDeviceAdmin}
      />
    </Stack.Navigator>
  );
};

export default AdminScheduleScreen;
