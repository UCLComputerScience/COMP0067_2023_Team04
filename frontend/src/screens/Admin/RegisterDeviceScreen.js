import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  Switch,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const RegisterDeviceScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [deviceDetails, setDeviceDetails] = useState("");
  const [storageLocation, setStorageLocation] = useState("");
  const [category, setCategory] = useState(null);
  const [open, setOpen] = useState(false);
  const [ruleExt, setRuleExt] = useState(0);
  const [ruleDur, setRuleDur] = useState("");
  const [launchYr, setLaunchYr] = useState("");
  const [cost, setCost] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const categories = [
    { label: "Laptop", value: "Laptop" },
    { label: "MacBook", value: "MacBook" },
    { label: "Android", value: "Android" },
    { label: "iPhone", value: "iPhone" },
    { label: "CPU", value: "CPU" },
    { label: "GPU", value: "GPU" },
    { label: "Other", value: "Other" },
  ];

  const handleSubmit = () => {
    if (
      !deviceName ||
      !deviceDetails ||
      !storageLocation ||
      !category ||
      !ruleDur ||
      !launchYr ||
      !cost
    ) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    console.log("Device Name:", deviceName);
    console.log("Device Details:", deviceDetails);
    console.log("Storage Location:", storageLocation);
    console.log("Category:", category);
    console.log("Allow to extent?:", ruleExt === 1 ? "Yes" : "No");
    console.log("Loan Duration:", ruleDur);
    console.log("Launch Year:", launchYr);
    console.log("Cost:", cost);
  };

  const toggleSwitch = () => {
    setRuleExt((prevValue) => (prevValue === 0 ? 1 : 0));
  };

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.dropdownTrigger}
          >
            <Text style={styles.label}>
              {selectedCategory
                ? `Selected Category: ${selectedCategory}`
                : "Select Category"}
            </Text>
          </TouchableOpacity>

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                  <FlatList
                    data={categories}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.modalItem}
                        onPress={() => {
                          setSelectedCategory(item.label);
                          setModalVisible(false);
                        }}
                      >
                        <Text style={styles.modalItemText}>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.value}
                  />
                  <Text style={styles.selectedCategoryText}>
                    {selectedCategory}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <Text style={styles.label}>Device Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Device Name"
            onChangeText={setDeviceName}
            value={deviceName}
          />
          <Text style={styles.label}>Device Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Device Details"
            onChangeText={setDeviceDetails}
            value={deviceDetails}
            multiline={true}
            numberOfLines={4}
          />
          <Text style={styles.label}>Storage Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Storage Location"
            onChangeText={setStorageLocation}
            value={storageLocation}
          />
          <Text style={styles.label}>Loan Duration</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter Loan Duration (days)"
            onChangeText={setRuleDur}
            value={ruleDur}
          />
          <Text style={styles.label}>Launch Year</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter Launch Year"
            onChangeText={setLaunchYr}
            value={launchYr}
          />
          <Text style={styles.label}>Cost</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter Cost(£)"
            onChangeText={setCost}
            value={cost}
          />
          <Text style={styles.label}>Allow to extent?</Text>
          <Switch
            trackColor={{ false: "#ddd", true: "#2196F3" }}
            thumbColor={ruleExt === 1 ? "#fff" : "#fff"}
            ios_backgroundColor="#ddd"
            onValueChange={toggleSwitch}
            value={ruleExt === 1}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Register Device</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flexGrow: 1,
    justifyContent: "top",
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 300, // Add paddingBottom to increase the scrollable space
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  dropdownContainer: {
    height: 60,
    marginBottom: 12,
  },
  dropdown: {
    backgroundColor: "#aaa",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
  },
  dropdownItem: {
    justifyContent: "flex-start",
  },
  dropdownLabel: {
    fontSize: 16,
    color: "#000",
  },
  dropdownList: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#AC145A",
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  dropdownWrapper: {
    position: "relative", // Add this line
    zIndex: 1000, // Add this line
  },
  dropdownTrigger: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },

  dropdownTriggerText: {},
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 20,
    width: "80%",
  },
  modalItem: {
    paddingVertical: 10,
  },
  modalItemText: {
    fontSize: 18,
  },
  selectedCategoryText: {
    fontSize: 16,
    marginBottom: 12,
  },
});

export default RegisterDeviceScreen;
