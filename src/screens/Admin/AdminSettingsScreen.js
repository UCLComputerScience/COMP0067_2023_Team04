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

const AdminSettingsScreen = () => {
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
});

export default AdminSettingsScreen;
