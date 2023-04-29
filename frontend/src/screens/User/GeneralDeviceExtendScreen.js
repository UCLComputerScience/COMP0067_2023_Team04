
//This interface is connected to Loan's interface of Ongoing devices, when coming from Loan's interface, he should get the summary details and due date of a device in Loan's interface, and then return or extend
//After extending, the extension allowance and date will be changed, this data needs to be returned to the database, but no need to return to the front-end, the front-end has already completed the relevant operations
//After returning, the ruturn date should be returned in the database
//read the database data of the date in line 251

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Button,
  Dimensions,
  Modal,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { addDays, format } from "date-fns";
import axios from "axios";

const GeneralDeviceExtendScreen = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const deviceId = route.params.deviceId;

  const [isExtendButtonDisabled, setIsExtendButtonDisabled] = useState(false);
  const [isReturnButtonDisabled, setIsReturnButtonDisabled] = useState(false);
  const [returnDateLabel, setReturnDateLabel] = useState("Due date");
  const [dueDate, setDueDate] = useState("2023-01-01");
  const [selectedCollectTime, setSelectedCollectTime] = useState("");
  const [deviceList, setDeviceList] = useState("");
  
  const [deviceName, setDeviceName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState("Loaned");

//需要在后端添加设备数据中的isExtendButtonDisabled和isReturnButtonDisabled，它们分别用于设置“Extend”和“Return”按钮的禁用状态
//It is necessary to add the "isExtendButtonDisabled" and "isReturnButtonDisabled" fields in the device data on the backend, 
//which are respectively used to set the disabled status of the "Extend" and "Return" buttons.

//把这个代码的API改成具体的API
//Change the name of 'API', such as line 78

//具体流程逻辑：当用户点击“Extend”按钮：
//首先检查device[0].extensionAllowance的值是否为1。 如果是，则允许用户延长借用期限。
//计算新的到期日期newDueDate。
//使用axios向API发送请求以更新数据库中设备的到期日期。
//再次调用fetchData以获取最新的设备数据。
//将isExtendButtonDisabled设置为true，禁用“Extend”按钮。
//弹出一个提示框，告知用户已成功延长借用期限。

//当用户点击“Return”按钮：
//弹出一个模态窗口，让用户选择设备归还时间。
//用户选择一个时间后，将关闭模态窗口，显示一个弹出框要求用户确认归还时间。
//用户确认归还时间后，使用axios向API发送请求以更新数据库中设备的归还日期。
//再次调用fetchData以获取最新的设备数据。

//When the user clicks the "Extend" button:
//First, check if the value of device[0].extensionAllowance is 1. If so, allow the user to extend the borrowing period.
//Calculate the new due date, newDueDate.
//Use axios to send a request to the API to update the due date of the device in the database.
//Call fetchData again to obtain the latest device data.
//Set isExtendButtonDisabled to true, disabling the "Extend" button.
//Display a prompt box to inform the user that the borrowing period has been successfully extended.
//When the user clicks the "Return" button:
//Display a modal window for the user to choose the device return time.
//After the user selects a time, close the modal window and show a popup box asking the user to confirm the return time.
//Once the user confirms the return time, use axios to send a request to the API to update the return date of the device in the database.
//Call fetchData again to obtain the latest device data.


const fetchData = async () => {
  try {
    const response = await axios.get("API");
    const data = response.data;
    setIsExtendButtonDisabled(data.isExtendButtonDisabled);
    setIsReturnButtonDisabled(data.isReturnButtonDisabled);
    setDueDate(data.dueDate);
    setStatus(data.status);
    setDeviceName(data.deviceName);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const [device, setDevice] = useState([
    {
      standardLoanDuration: 14,
      extensionAllowance: 1,
      summaryDetails:
        '{"CPU": "Intel Core i9-12900H Octo-core 20 threads", \
                      "GPU": "RTX 3070ti 8G 150W", \
                      "Memory": "DDR5 16GB 4800Hz Dual", \
                      "SSD": "SAMSUNG PM9A1 512GB", \
                      "Screen": "2.5K (2560*1600) 16:10 165Hz", \
                      "Power": "300W", \
                      "WIFI": "AX211"}',
    },
  ]);

  const parseDateStringToTimestamp = (dateString) => {
    const [day, time] = dateString.split(": ");
    const [start, end] = time.split(" - ");
    const date = new Date();
    const [startHour, startMinute] = start.split(":");
    date.setHours(parseInt(startHour, 10), parseInt(startMinute, 10), 0, 0);
    return date.getTime();
  };

  const extendDevice = async () => {
    if (device[0].extensionAllowance === 1) {
      const newDueDate = addDays(new Date(dueDate), 7);
      const formattedNewDueDate = format(newDueDate, "yyyy-MM-dd");
      
      await axios.post("API", {
        action: "extend",
        deviceId: deviceId,
        newDueDate: formattedNewDueDate,
      });
      fetchData();

      setIsExtendButtonDisabled(true);
      Alert.alert(
        "Extension successful",
        "You have successfully extended your loan.",
        [
          {
            text: "YES",
            onPress: () => {
              setDueDate(formattedNewDueDate);
              setDevice((prevState) => [
                {
                  ...prevState[0],
                  extensionAllowance: 0,
                },
              ]);
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  const summaryDetailsUnpacked = JSON.parse(device[0].summaryDetails);

  const [loanRuleExpanded, setLoanRuleExpanded] = useState(false);
  const [summaryDetailsExpanded, setSummaryDetailsExpanded] = useState(false);
  const [devicesIDExpanded, setDevicesIDExpanded] = useState(false);

  const toggleLoanRule = () => {
    setLoanRuleExpanded(!loanRuleExpanded);
  };
  const toggleSummaryDetails = () => {
    setSummaryDetailsExpanded(!summaryDetailsExpanded);
  };
  const toggleDevicesID = () => {
    setDevicesIDExpanded(!devicesIDExpanded);
  };

  const showAlert = (timeString) => {
    const timestamp = parseDateStringToTimestamp(timeString);
    Alert.alert(
      "Return confirmation",
      `Are you sure you want to return the device on ${timeString}?`,
      [
        {
          text: "NO",
          onPress: () => console.log("NO Pressed"),
          style: "cancel",
        },
        {
          text: "YES",
          onPress: async () => {
            const timeString = new Date().toISOString();
            await axios.post("API", {
            action: "return",
            deviceId: deviceId,
            returnDate: timeString,
            });
            fetchData();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const showSecondAlert = () => {
    Alert.alert(
      "Return Time selected",
      "You have successfully selected a time slot. Please return the device during the selected time slot.",
      [
        {
          text: "YES",
          onPress: () => {
            console.log("YES Pressed");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Select the collect time</Text>
            <View style={styles.modalSection}>
              {[
                "Monday: 10:00 - 12:00",
                "Tuesday: 09:00 - 12:30",
                "Wednesday: 10:00 - 14:00",
                "Thursday: 14:00 - 16:00",
                "Friday: 13:00 - 14:00",
              ].map((day, index) => (
                <View key={index}>
                  {index === 0 && <View style={styles.modalDivider} />}
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      console.log("Selected day:", day);
                      setSelectedCollectTime(day);
                      setModalVisible(false);
                      showAlert(day);
                    }}
                  >
                    <Text style={styles.modalButtonText}>{day}</Text>
                  </TouchableOpacity>
                  {index === 4 && <View style={styles.modalDivider} />}
                </View>
              ))}
            </View>
            <View style={styles.modalDivider} />
            <TouchableOpacity
              style={[styles.modalButtonNoBorder, { marginTop: 2 }]}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalCancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.container} contentInset={{ bottom: 100 }}>
        <View style={styles.titleView}>
          <Text style={styles.title}>{deviceName}</Text>
        </View>

        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabButton} onPress={toggleLoanRule}>
            <View style={styles.detailLayout}>
              <Text style={[styles.tabButtonText, { flex: 1 }]}>
                Loan Rules
              </Text>
              <Ionicons
                style={{ marginLeft: "auto" }}
                name={loanRuleExpanded ? "chevron-up" : "chevron-down"}
                size={16}
                color={"#AC145A"}
              />
            </View>
          </TouchableOpacity>
          {loanRuleExpanded && (
            <View style={styles.detailRow}>
              <View style={styles.detailRowLayout}>
                <Text style={{ fontWeight: "500", flex: 2 }}>
                  Standard Loan Duration:
                </Text>
                <Text style={{ fontWeight: "300", flex: 1 }}>
                  {device[0].standardLoanDuration} Days
                </Text>
              </View>
              <View style={styles.detailRowLayout}>
                <Text style={{ fontWeight: "500", flex: 2 }}>
                  Extension Allowance:
                </Text>
                <Text style={{ fontWeight: "300", flex: 1 }}>
                  {device[0].extensionAllowance}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.tabBar}>
          <TouchableOpacity
            style={styles.tabButton}
            onPress={toggleSummaryDetails}
          >
            <View style={styles.detailLayout}>
              <Text style={[styles.tabButtonText, { flex: 1 }]}>
                Summary Details
              </Text>
              <Ionicons
                style={{ marginLeft: "auto" }}
                name={summaryDetailsExpanded ? "chevron-up" : "chevron-down"}
                size={16}
                color={"#AC145A"}
              />
            </View>
          </TouchableOpacity>
          {summaryDetailsExpanded && (
            <View style={styles.detailRow}>
              {Object.entries(summaryDetailsUnpacked).map(([key, value]) => (
                <View key={key} style={styles.detailRowLayout}>
                  <Text style={{ fontWeight: "500", flex: 1 }}>{key}:</Text>
                  <Text style={{ fontWeight: "300", flex: 2 }}>{value}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabButton} onPress={toggleDevicesID}>
            <View style={styles.detailLayout}>
              <Text style={[styles.tabButtonText, { flex: 1 }]}>
                Loan options
              </Text>
              <Ionicons
                style={{ marginLeft: "auto" }}
                name={devicesIDExpanded ? "chevron-up" : "chevron-down"}
                size={16}
                color={"#AC145A"}
              />
            </View>
          </TouchableOpacity> 
          {devicesIDExpanded && (
            <View style={styles.detailRow}>
              <View style={styles.detailRowLayout}>
                <Text style={{ fontWeight: "500", flex: 2 }}>Status:</Text>
                <Text style={{ fontWeight: "300", flex: 1 }}>{status}</Text>
              </View>
              <View style={styles.detailRowLayout}>
                <Text style={{ fontWeight: "500", flex: 2 }}>
                  {returnDateLabel}:
                </Text>
                <Text style={{ fontWeight: "300", flex: 1 }}>{dueDate}</Text>
              </View>
              <View style={styles.detailRowLayout}>
                <Text style={{ fontWeight: "500", flex: 2 }}>Location:</Text>
                <Text style={{ fontWeight: "300", flex: 1 }}>MPEB 4.20</Text>
              </View>
            </View>
          )}
        </View>

        <View
          style={{
            paddingTop: 80,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={[
                {
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 15,
                  width: "100%",
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                },
                status !== "Loaned" || isReturnButtonDisabled
                  ? { backgroundColor: "#EEEEEF", opacity: 0.5 }
                  : { backgroundColor: "#EEEEEF" },
              ]}
              onPress={() => setModalVisible(true)}
              disabled={status !== "Loaned" || isReturnButtonDisabled}
            >
              <Text
                style={{
                  color:
                    status !== "Loaned" || isReturnButtonDisabled
                      ? "#A0A0A0"
                      : "#AC145A",
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                Return
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={[
                {
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 15,
                  width: "100%",
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                },
                isExtendButtonDisabled
                  ? { backgroundColor: "#EEEEEF", opacity: 0.5 }
                  : { backgroundColor: "#EEEEEF" },
              ]}
              onPress={extendDevice}
              disabled={isExtendButtonDisabled}
            >
              <Text
                style={{
                  color: isExtendButtonDisabled ? "#A0A0A0" : "#AC145A",
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                Extend
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  titleView: {
    alignItems: "center",
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  tabBar: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  tabButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#D6D6D6",
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
  detailLayout: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailRow: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  detailRowLayout: {
    flexDirection: "row",
    paddingVertical: 2,
  },

  deviceKey: {
    fontWeight: "500",
    lineHeight: 20,
    fontSize: 16,
  },
  deviceID: {
    fontWeight: "300",
    flex: 2,
    lineHeight: 20,
    textDecorationLine: "underline",
  },
  deviceState: {
    fontWeight: "300",
    flex: 1,
    lineHeight: 20,
    textAlign: "center",
  },

  historyDeviceID: {
    fontWeight: "300",
    flex: 1.1,
    lineHeight: 20,
    textAlign: "left",
  },
  historyUserID: {
    fontWeight: "300",
    flex: 0.6,
    lineHeight: 20,
    textAlign: "center",
  },
  historyState: {
    fontWeight: "300",
    flex: 1,
    lineHeight: 20,
    textAlign: "right",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
    marginTop: 250,
  },
  returnButtonWrapper: {
    marginRight: 30,
    backgroundColor: "#EBEDEF",
    borderRadius: 10,
    width: Dimensions.get("window").width * 0.35,
    paddingVertical: 5,
  },
  extendButtonWrapper: {
    marginLeft: 30,
    backgroundColor: "#EBEDEF",
    borderRadius: 10,
    width: Dimensions.get("window").width * 0.35,
    paddingVertical: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: -10,
    color: "black",
  },
  modalSection: {
    width: "100%",
  },
  modalButton: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
    borderTopWidth: 0,
  },
  modalButtonText: {
    color: "#AC145A",
    fontSize: 17,
    fontWeight: "normal",
  },
  modalButtonNoBorder: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  modalDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#D6D6D6",
    width: "127%",
    alignSelf: "center",
    marginVertical: 5,
  },
  modalCancelButtonText: {
    color: "#AC145A",
    fontSize: 18,
    fontWeight: "normal",
    marginBottom: -15,
    marginTop: -10,
  },
});

export default GeneralDeviceExtendScreen;
