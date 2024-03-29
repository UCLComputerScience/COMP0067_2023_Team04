import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
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
import QRCode from "react-native-qrcode-svg";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const DetailDeviceAdmin = () => {
  const route = useRoute();
  const { deviceID } = route.params;

  const API_BASE_URL = "https://0067team4app.azurewebsites.net/posts";

  async function getJwtToken() {
    try {
      const jwtToken = await SecureStore.getItemAsync("jwtToken");
      if (jwtToken) {
        console.log("JWT token fetched:", jwtToken);
        return jwtToken;
      } else {
        console.log("Cannot find JWT token");
        return null;
      }
    } catch (error) {
      console.log("JWT token fetched failed:", error);
      return null;
    }
  }

  const [deviceInfo, setDeviceInfo] = useState("");
  const fetchDeviceData = async () => {
    try {
      const jwtToken = await getJwtToken();
      const response = await axios.get(`${API_BASE_URL}/devices/${deviceID}`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      console.log("Received data from API for device info:", response.data);
      setDeviceInfo(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDeviceData();
  }, []);

  /*const returnDevice = async () => {
    try {
      const jwtToken = await getJwtToken();
      const response = await axios.post(`${API_BASE_URL}/return/${deviceID}`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      console.log("Received data from API for device info:", response.data);
      setDeviceInfo(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };*/

  const loanDevice = async () => {
    try {
      const jwtToken = await getJwtToken();
      const response = await fetch(`${API_BASE_URL}/beginLoan/${deviceID}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to loan device.");
      }

      Alert.alert("Success", "Device Loaned successfully.");
    } catch (err) {
      Alert.alert(
        "Error",
        err.message ||
          "An error occurred. This may caused by the device has been deleted."
      );
      navigation.goBack();
    }
    fetchDeviceData();
  };

  const returnDevice = async () => {
    try {
      const jwtToken = await getJwtToken();
      const response = await fetch(`${API_BASE_URL}/return/${deviceID}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to return device.");
      }

      Alert.alert("Success", "Device returned successfully.");
    } catch (err) {
      Alert.alert("Error", err.message || "An error occurred.");
    }
    fetchDeviceData();
  };

  const turnAvailable = async () => {
    const newState = "Available";
    const state = {
      state: newState,
    };

    try {
      const jwtToken = await getJwtToken();
      const response = await fetch(`${API_BASE_URL}/changeState/${deviceID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(state),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to change state.");
      }

      Alert.alert("Success", "State changed successfully.");
    } catch (err) {
      Alert.alert("Error", err.message || "An error occurred.");
    }
    fetchDeviceData();
  };

  const changeState = async () => {
    const newState = {
      state: "Available",
    };
    try {
      const jwtToken = await getJwtToken();
      const response = await axios.post(
        `${API_BASE_URL}/changeState/${deviceID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(newState),
        }
      );
      console.log("Received data from API for device info:", response.data);
      setDeviceInfo(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [deviceLoan, setDeviceLoan] = useState("");
  const fetchDeviceLoanData = async () => {
    try {
      const jwtToken = await getJwtToken();
      const response = await axios.get(
        `${API_BASE_URL}/latestLoan/${deviceID}`,
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
        }
      );
      console.log("Received data from API:", response.data);
      setDeviceLoan(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchDeviceLoanData();
  }, []);

  const submitIssue = async () => {
    const Issue = {
      content: inputText,
    };

    try {
      const jwtToken = await getJwtToken();
      const response = await fetch(`${API_BASE_URL}/reportIssue/${deviceID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(Issue),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message || "Failed to change contact information."
        );
      }

      Alert.alert("Success", "Issue submitted successfully.");
    } catch (err) {
      Alert.alert("Error", err.message || "An error occurred.");
    }
    fetchDeviceData();
  };

  const submitIssueState = async () => {
    const IssueState = {
      state: selectedState,
    };

    try {
      const jwtToken = await getJwtToken();
      const response = await fetch(`${API_BASE_URL}/changeState/${deviceID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(IssueState),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to change state.");
      }

      //Alert.alert("Success", "State changed successfully.");
    } catch (err) {
      Alert.alert("Error", err.message || "An error occurred.");
    }
  };

  const deleteDevice = async () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this device?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Deletion cancelled"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              const jwtToken = await getJwtToken();
              const response = await fetch(
                `${API_BASE_URL}/deleteDevice/${deviceID}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${jwtToken}`,
                  },
                }
              );
              if (!response.ok) {
                let errorMessage = "Failed to delete device";
                try {
                  const responseData = await response.json();
                  errorMessage = responseData.message;
                } catch (e) {
                  console.error("Failed to parse response JSON:", e);
                }
                throw new Error(errorMessage);
              }
              Alert.alert("Success", "Device deleted successfully.");
              navigation.goBack();
            } catch (err) {
              Alert.alert("Error", err.message || "An error occurred.");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const navigation = useNavigation();

  const getButtonInfo = () => {
    if (deviceInfo.state === "Reserved") {
      return { title: "Loan", newState: "Loan" };
    } else if (deviceInfo.state === "Loaned") {
      return { title: "Return", newState: "Available" };
    } else if (deviceInfo.state === "Maintenance") {
      return { title: "Turn Available", newState: "Available" };
    } else {
      return { title: "Not Applicable", newState: null };
    }
  };

  const buttonInfo = getButtonInfo();

  //modal
  const [modalVisible, setModalVisible] = useState(false);
  const [qrCodeModalVisible, setQRCodeModalVisible] = useState(false);

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
              submitIssue();
              submitIssueState();
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

  const qrCodeRef = useRef();

  const saveQRCodeToGallery = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== "granted") {
        console.log("Permission not granted");
        return;
      }

      qrCodeRef.current.toDataURL(async (dataURL) => {
        const base64Image = dataURL.replace("data:image/png;base64,", "");
        const imageName = `qr-code-${Date.now()}.png`;
        const fileUri = FileSystem.documentDirectory + imageName;

        await FileSystem.writeAsStringAsync(fileUri, base64Image, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const asset = await MediaLibrary.createAssetAsync(fileUri);

        // Check if the album exists or create it if it doesn't
        let album = await MediaLibrary.getAlbumAsync("Camera Roll");
        if (!album) {
          album = await MediaLibrary.createAlbumAsync(
            "Camera Roll",
            asset,
            false
          );
        } else {
          await MediaLibrary.addAssetsToAlbumAsync(asset.id, album.id, false);
        }

        console.log("QR code saved to gallery");

        // delete the temporary file after saving it to the gallery.
        await FileSystem.deleteAsync(fileUri);
        Alert.alert("QR code saved", "The QR code is successfully saved.");
      });
    } catch (error) {
      console.log("Error saving QR code to gallery:", error);
      Alert.alert("Error", "The QR code failed to be saved.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.textContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 0.1 }}></View>
          <Text style={[styles.deviceName, { flex: 10 }]}>
            {deviceInfo.name}
          </Text>
          <TouchableOpacity onPress={deleteDevice}>
            <Ionicons
              size={20}
              color={"#AC145A"}
              name="trash-outline"
              style={{ flex: 0.1 }}
            ></Ionicons>
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        <View style={[styles.row, { marginTop: 10 }]}>
          <Text style={styles.label}>Device ID:</Text>
          <Text style={styles.text}>{deviceID}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Standard Loan Duration:</Text>
          <Text style={styles.text}>{deviceInfo.ruleDur} days</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Extension Allowane:</Text>
          <Text style={styles.text}>{deviceInfo.ruleExt} times</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Storage Location:</Text>
          <Text style={styles.text}>{deviceInfo.storage}</Text>
        </View>
        <View style={[styles.row, { marginTop: 15 }]}>
          <Text style={styles.label}>QR code:</Text>
          <Text style={styles.text}>
            Current QR code is in line with Device ID
          </Text>
        </View>

        <View style={{ alignItems: "flex-end", marginRight: 30 }}>
          <View style={{ alignItems: "center", paddingTop: 10 }}>
            <TouchableOpacity
              style={styles.buttonSmall}
              onPress={() => {
                setQRCodeModalVisible(!qrCodeModalVisible);
              }}
            >
              <Text
                style={{
                  color: "#AC145A",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                View QR code
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.textLoanDetails}>Loan Details</Text>
        <View style={[styles.separator, { marginTop: 10 }]} />
        <View style={[styles.row, { marginTop: 10 }]}>
          <Text style={styles.label}>Loan date:</Text>
          <Text style={styles.text}>
            {deviceLoan.startDate ? deviceLoan.startDate.substring(0, 10) : ""}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Last user ID:</Text>
          <Text style={styles.text}>
            {deviceLoan.userId ? deviceLoan.userId : ""}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Last user Email:</Text>
          <Text style={styles.text}>
            {deviceLoan.userEmail ? deviceLoan.userEmail : ""}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Device State:</Text>
          <Text style={styles.text}>{deviceInfo.state}</Text>
        </View>
        {deviceInfo.issues ? (
          <View style={styles.row}>
            <Text style={styles.label}>Issue:</Text>
            <Text style={styles.text}>{deviceInfo.issues}</Text>
          </View>
        ) : null}

        <View
          style={{ alignItems: "flex-end", marginRight: 30, paddingRight: 10 }}
        >
          <View style={{ alignItems: "center", paddingTop: 10 }}>
            <TouchableOpacity
              style={styles.buttonSmall}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text
                style={{
                  color: "#AC145A",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                Report issue
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ paddingTop: 80 }}>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.buttonBig}
              onPress={() => {
                if (deviceInfo.state === "Loaned") {
                  returnDevice();
                } else if (deviceInfo.state === "Reserved") {
                  loanDevice();
                } else if (deviceInfo.state === "Maintenance") {
                  turnAvailable();
                } else {
                  Alert.alert(
                    "Error",
                    "Action not applicable for this device state"
                  );
                }
              }}
              disabled={!buttonInfo.newState}
            >
              <Text
                style={{
                  color: buttonInfo.newState ? "#AC145A" : "#ccc",
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                {buttonInfo.title}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={qrCodeModalVisible}
        onRequestClose={() => {
          Alert.alert("QR code modal has been closed.");
          setQRCodeModalVisible(!qrCodeModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalViewQR}>
            <View style={{ paddingTop: 30 }}>
              <QRCode
                size={150}
                value={String(route.params.deviceID)}
                getRef={(c) => (qrCodeRef.current = c)}
              />
            </View>

            <View style={{ paddingTop: 10, flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Save QR Code",
                    "Are you sure you want to save this QR code to the gallery?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                      },
                      {
                        text: "Save",
                        onPress: saveQRCodeToGallery,
                      },
                    ],
                    { cancelable: false }
                  );
                }}
              >
                <Ionicons
                  name="cloud-download-outline"
                  size={20}
                  color={"#AC145A"}
                />
              </TouchableOpacity>
            </View>

            <View style={{ paddingTop: 10 }}>
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => {
                  setQRCodeModalVisible(!qrCodeModalVisible);
                }}
              >
                <Text style={styles.closeModalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
                  <Text style={styles.modalReportText}>Report</Text>
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
  buttonSmall: {
    backgroundColor: "#EEEEEF",
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderRadius: 25,
    width: "40%",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
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

  buttonBig: {
    backgroundColor: "#EEEEEF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: "70%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
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
  modalReportText: {
    color: "#AC145A",
    fontSize: 16,
    fontWeight: 500,
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
    paddingHorizontal: 50,
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
  closeModalButton: {
    backgroundColor: "#AC145A",
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    marginTop: 15,
  },
  closeModalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DetailDeviceAdmin;
