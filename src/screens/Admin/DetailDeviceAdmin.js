import React, { useLayoutEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Button,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const DetailDeviceAdmin = () => {
  const route = useRoute();
  const { deviceID } = route.params;
  //console.log(deviceID);

  const deviceInfo = {
    deviceName: "Lenovo Legion Y9000P 2022 RTX 3070Ti",
    //deviceID: "20220901001",
    standardLoanDuration: "14",
    extensionAllowance: "1",
    storageLocation: "E17",
    QRCode: "010 001 110 001 001 010 111 010 110 100 001 011 111 001 101",
  };

  const loanDetails = {
    loanDate: "2022-03-21",
    userID: "ucabcda",
    deviceState: "Loaned",
    //how to achieve the status change? fetch from DB (require refresh) : change from frontend once clicked
  };

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: deviceInfo.deviceName });
  }, [navigation, deviceInfo.deviceName]);

  const getButtonInfo = () => {
    if (loanDetails.deviceState === "Reserved") {
      return { title: "Loan", newState: "Loaned" };
    } else if (loanDetails.deviceState === "Loaned") {
      return { title: "Return", newState: "Available" };
    } else {
      return { title: "Not Applicable", newState: null };
    }
  };

  const buttonInfo = getButtonInfo();
  /*
  const updateDeviceState = async () => {
    try {
      // Backend
      const response = await fetch("https://yourapi.com/updateDeviceState", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deviceID,
          newState: "您需要将设备状态更改为的新状态",
        }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert("Success", "Device state updated successfully.");
      } else {
        Alert.alert("Error", "Failed to update device state.");
      }
    } catch (error) {
      console.error("Error updating device state:", error);
    }
  };*/

  //modal
  const [modalVisible, setModalVisible] = useState(false);

  const reportIssue = () => {
    if (inputText === "") {
      Alert.alert("Error", "Please enter the error information.");
      return;
    }
    if (!selectedState) {
      Alert.alert("Error", "Please select a state before reporting.");
      return;
    }
    Alert.alert(
      "Report confirmation",
      "Are you sure you want to report an issue and change the device state into \u0020" +
        selectedState +
        "?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            if (modalVisible) {
              console.log("Input Text:", inputText);
              console.log("New State:", selectedState);

              setInputText("");
              setSelectedState(null);
            }
            setModalVisible(!modalVisible);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const clossModal = () => {
    Alert.alert(
      "Stop the report?",
      "Are you sure you want to stop reporting the issue?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            setModalVisible(!modalVisible);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const [inputText, setInputText] = useState("");

  //Device new state
  // Inside DetailDeviceAdmin component
  const [selectedState, setSelectedState] = useState(null);
  const selectState = (state) => {
    setSelectedState(state);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.deviceName}>{deviceID}</Text>
        <Text style={styles.deviceName}>{deviceInfo.deviceName}</Text>
        <View style={styles.separator} />
        <View style={[styles.row, { marginTop: 10 }]}>
          <Text style={styles.label}>Device ID:</Text>
          <Text style={styles.text}>{deviceID}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Standard Loan Duration:</Text>
          <Text style={styles.text}>
            {deviceInfo.standardLoanDuration} days
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Extension Allowane:</Text>
          <Text style={styles.text}>{deviceInfo.extensionAllowance} times</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Storage Location:</Text>
          <Text style={styles.text}>{deviceInfo.storageLocation}</Text>
        </View>
        <View style={[styles.row, { marginTop: 15 }]}>
          <Text style={styles.label}>QR code:</Text>
          <Text style={styles.text}>{deviceInfo.QRCode}</Text>
        </View>
        <Text style={styles.textLoanDetails}>Loan Details</Text>
        <View style={[styles.separator, { marginTop: 10 }]} />
        <View style={[styles.row, { marginTop: 10 }]}>
          <Text style={styles.label}>Loan date:</Text>
          <Text style={styles.text}>{loanDetails.loanDate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>User ID:</Text>
          <Text style={styles.text}>{loanDetails.userID}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Device State:</Text>
          <Text style={styles.text}>{loanDetails.deviceState}</Text>
        </View>
        <View style={styles.buttonRow}>
          <View style={{ flex: 0.8 }}></View>
          <View style={{ flex: 1 }}>
            <Button
              title="Report issue"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />
          </View>
        </View>
        <View style={{ paddingTop: 50 }}>
          <Button
            title={`${buttonInfo.title}`}
            onPress={() => Alert.alert("Success")}
            //onPress={updateDeviceState}
            // disable when null
            disabled={!buttonInfo.newState}
          />
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalView}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ width: 70 }} />
                  <View style={{}}>
                    <Text style={styles.modalTitle}>Report Issue</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "flex-end",
                      paddingLeft: 50,
                      paddingTop: 30,
                    }}
                  >
                    <TouchableOpacity onPress={clossModal}>
                      <Ionicons
                        name="trash-outline"
                        size={20}
                        color="#AC145A"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.modalTextView}>
                  <Text style={styles.modalText}>
                    Please fill in the form to report the issue.
                  </Text>
                </View>
                <TextInput
                  style={styles.modalTextInput}
                  multiline={true}
                  onChangeText={(text) => setInputText(text)}
                  value={inputText}
                ></TextInput>
                <View style={[styles.modalTextView, { marginTop: 10 }]}>
                  <Text style={styles.modalStateTitle}>Select a new state</Text>
                </View>
                <View
                  style={[styles.modalStateSeperator, { paddingBottom: 5 }]}
                ></View>
                <View style={styles.modalStateView}>
                  <Text style={styles.modalStateText}>Maintenance</Text>
                  <View style={{ flex: 0.2, paddingTop: 5 }}>
                    <TouchableOpacity
                      onPress={() => selectState("Maintenance")}
                      style={[
                        styles.modalButtonCircle,
                        {
                          backgroundColor:
                            selectedState === "Maintenance"
                              ? "#AC145A"
                              : "#CCCCCC",
                        },
                      ]}
                    />
                  </View>
                </View>
                <View style={[styles.modalStateView]}>
                  <Text style={styles.modalStateText}>Scrapped</Text>
                  <View style={{ flex: 0.2, paddingTop: 5 }}>
                    <TouchableOpacity
                      onPress={() => selectState("Scrapped")}
                      style={[
                        styles.modalButtonCircle,
                        {
                          backgroundColor:
                            selectedState === "Scrapped"
                              ? "#AC145A"
                              : "#CCCCCC",
                        },
                      ]}
                    />
                  </View>
                </View>
                <View
                  style={[styles.modalStateSeperator, { paddingTop: 15 }]}
                ></View>

                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={reportIssue}
                >
                  <Text style={styles.modalReportTexe}>Report</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  textContainer: {
    flex: 2,
  },
  deviceName: {
    paddingHorizontal: 40,
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    padding: 10,
  },
  textLoanDetails: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginHorizontal: 10,
  },
  separator: {
    height: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },
  row: {
    flexDirection: "row",
    marginHorizontal: 10,
  },
  label: {
    flex: 1,
    fontSize: 15,
    fontWeight: "light",
  },
  text: {
    flex: 0.8,
    fontSize: 15,
    fontWeight: "thin",
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    height: "60%",
    backgroundColor: "white",
    borderRadius: 20,
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
  modalTitle: {
    //alignItems: "center",
    paddingTop: 35,
    fontSize: 18,
    fontWeight: 500,
  },
  modalTextView: {
    alignItems: "flex-start",
    width: "100%",
    paddingLeft: "8%",
    paddingVertical: 10,
  },
  modalText: {
    fontSize: 12,
    fontWeight: 300,
    alignItems: "flex-start",
    alignContent: "flex-start",
    textAlign: "left",
  },

  modalTextInput: {
    paddingTop: 10,
    borderRadius: 15,
    backgroundColor: "#EEEEEF",
    height: "50%",
    width: "80%",
    textAlignVertical: "top",
  },
  modalStateSeperator: {
    borderBottomWidth: 1,
    borderColor: "#ECECEC",
    width: "100%",
    marginTop: -5,
  },
  modalStateTitle: {
    fontSize: 14,
    fontWeight: 300,
    alignItems: "flex-start",
    alignContent: "flex-start",
    textAlign: "left",
  },

  modalStateView: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    paddingLeft: "8%",
  },
  modalStateText: {
    paddingVertical: 5,
    color: "#AC145A",
    flex: 1,
  },
  modalButtonCircle: {
    alignItems: "flex-end",
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: "#AC145A",
  },
  modalReportTexe: {
    color: "#AC145A",
    fontSize: 16,
    fontWeight: 500,
  },
});

export default DetailDeviceAdmin;
