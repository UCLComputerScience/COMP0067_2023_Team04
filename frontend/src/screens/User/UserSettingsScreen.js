import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../Navigation/AuthContext";
import Ionicons from "react-native-vector-icons/Ionicons";

const UserSettingsScreen = () => {
  const { logout } = useContext(AuthContext);

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
          onPress: () => logout(),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ paddingTop: 20 }}>
      <TouchableOpacity>
        <View style={styles.buttonRow}>
          <Text style={styles.buttonText}>Personal details</Text>
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

  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },

  sectionContainer: {
    marginBottom: 30,
  },

  section: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },

  sectionTitle: {
    fontFamily: "System",
    fontSize: 14,
    color: "#333",
  },

  sectionSubTitle: {
    fontSize: 14,
    color: "#ccc",
  },

  generalContainer: {
    height: 30,
    flexDirection: "row",
    alignItems: "center",
  },

  generalTitle: {
    paddingLeft: 12,
    fontSize: 12,
    color: "#333",
  },

  generalSubTitle: {
    fontSize: 20,
    color: "#ccc",
    marginLeft: 4,
  },
});
export default UserSettingsScreen;
