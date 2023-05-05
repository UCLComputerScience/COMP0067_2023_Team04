import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../Navigation/AuthContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

const AdminSettingsScreen = () => {
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();

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

  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [recievedContact, setRecievedContact] = useState("");
  const [editContact, setEditContact] = useState("");
  const fetchDeviceData = async () => {
    try {
      const jwtToken = await getJwtToken();
      const response = await axios.get(`${API_BASE_URL}/readAdminContactInfo`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      console.log("Received data from API:", response.data);
      setRecievedContact(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchDeviceData();
  }, []);

  const Logout = async () => {
    await SecureStore.deleteItemAsync("jwtToken");
    navigation.navigate("LoginTabScreen");
  };

  const handlelogout = () => {
    Alert.alert(
      "Are you sure?",
      "Are you sure you want to logout of the application?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => Logout(),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ paddingTop: 20 }}>
      <TouchableOpacity
        onPress={() => {
          setEditContact(recievedContact);
          setContactModalVisible(true);
        }}
      >
        <View style={styles.buttonRow}>
          <Text style={styles.buttonText}>Personal details</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#ccc" />
        </View>
      </TouchableOpacity>
      <View style={styles.separator} />
      <Text style={styles.title}>User interactions</Text>
      <TouchableOpacity>
        <View style={styles.buttonRow}>
          <Text style={styles.buttonText}>Weekly availability</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#ccc" />
        </View>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity>
        <View style={styles.buttonRow}>
          <Text style={styles.buttonText}>Edit user term</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#ccc" />
        </View>
      </TouchableOpacity>
      <View style={styles.separator} />
      <Text style={styles.title}>General</Text>
      <TouchableOpacity>
        <View style={styles.buttonRow}>
          <Text style={styles.buttonText}>About</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "#ccc", fontWeight: 500 }}>1.0.0</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="#ccc" />
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.separator} />

      <TouchableOpacity style={{ paddingTop: 45 }} onPress={handlelogout}>
        <View style={styles.buttonRow}>
          <Text style={styles.buttonText}>Logout</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#ccc" />
        </View>
      </TouchableOpacity>
      <View style={styles.separator} />

      <Modal
        animationType="fade"
        transparent={true}
        visible={contactModalVisible}
        onRequestClose={() => {
          setContactModalVisible(false);
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.centeredView}>
            <View style={styles.modalViewQR}>
              <Text style={{ fontSize: 18, marginBottom: 20 }}>
                Edit Personal Contact
              </Text>

              <TextInput
                style={{
                  height: 200,
                  width: "100%",
                  marginBottom: 20,
                  paddingLeft: 10,
                  backgroundColor: "#ECECEC",
                  borderRadius: 15,
                }}
                multiline={true}
                onChangeText={(text) => setEditContact(text)}
                value={editContact}
              />

              <Button
                title="Save Changes"
                onPress={() => {
                  // Save changes to the database here
                  //setPreviousAnnouncement(editedAnnouncement);
                  setContactModalVisible(false);
                }}
              />
              <Button
                title="Cancel"
                onPress={() => {
                  setContactModalVisible(false);
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    width: "100%",
    backgroundColor: "white",
    height: 45,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "regular",
  },
  separator: {
    height: 0.5,
    backgroundColor: "#D6D6D6",
  },
  title: {
    padding: 10,
    fontSize: 14,
    fontWeight: "regular",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalViewQR: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default AdminSettingsScreen;
