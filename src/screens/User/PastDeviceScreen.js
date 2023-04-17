import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Button, Dimensions, Modal, Alert } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { addDays, format } from 'date-fns';

import { createStackNavigator } from '@react-navigation/stack';


//这个界面是连接Loan的界面的Past的设备，当从loan界面过来时，只需要获取loan界面的某个device的summary details和return date
//在246行需要读取数据库return date的数据


const GeneralDeviceExtendScreen2 = () => {
  const [isExtendButtonDisabled, setIsExtendButtonDisabled] = useState(false);
  const [isReturnButtonDisabled, setIsReturnButtonDisabled] = useState(false);

 
  const [dueDate, setDueDate] = useState('2023-01-01');
  const [selectedCollectTime, setSelectedCollectTime] = useState('');
  const [deviceList, setDeviceList] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const deviceName = route.params.deviceName;
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState("Returned");
  const device = [
    {
      standardLoanDuration: 14,
      extensionAllowance: 0,
      summaryDetails:
        '{"CPU": "Intel Core i9-12900H Octo-core 20 threads", \
                      "GPU": "RTX 3070ti 8G 150W", \
                      "Memory": "DDR5 16GB 4800Hz Dual", \
                      "SSD": "SAMSUNG PM9A1 512GB", \
                      "Screen": "2.5K (2560*1600) 16:10 165Hz", \
                      "Power": "300W", \
                      "WIFI": "AX211"}',
    },
  ];

  const parseDateStringToTimestamp = (dateString) => {
    const [day, time] = dateString.split(': ');
    const [start, end] = time.split(' - ');
    const date = new Date();
    const [startHour, startMinute] = start.split(':');
    date.setHours(parseInt(startHour, 10), parseInt(startMinute, 10), 0, 0);
    return date.getTime();
  };

  const extendDevice = () => {
    if (device[0].extensionAllowance === 1) {
      const newDueDate = addDays(new Date(dueDate), 7);
      const formattedNewDueDate = format(newDueDate, 'yyyy-MM-dd');
  
      setIsExtendButtonDisabled(device[0].extensionAllowance === 0);
      Alert.alert(
        'Extension successful',
        'You have successfully extened your loan.',
        [
          {
            text: 'YES',
            onPress: () => {
              setDueDate(formattedNewDueDate);
              device[0].extensionAllowance = 0;
              setIsExtendButtonDisabled(false);
              setDeviceList((prevState) => [
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
          onPress: () => {
            console.log("YES Pressed");
            showSecondAlert(timestamp);
            
            setDueDate(timeString);
            setIsReturnButtonDisabled(true);
            setIsExtendButtonDisabled(true);
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
            <Text style={styles.modalTitle}>select the return time</Text>
            {['Monday: 10:00 - 12:00', 'Tuesday: 09:00 - 12:30', 'Wednesday : 10:00 - 14:00', 'Thursday: 14:00 - 16:00', 'Friday: 13:00 - 14:00'].map((day, index) => (

              <TouchableOpacity
              key={index}
              style={styles.modalButton}
              onPress={() => {
                console.log('Selected day:', day);
                setSelectedCollectTime(day);
                setModalVisible(false);
                showAlert(day); 
              }}
              >
              <Text style={styles.modalButtonText}>{day}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.modalButtonNoBorder, { marginTop: 20 }]} 
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>cancel</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      <ScrollView style={styles.container} contentInset={{ bottom: 100 }}>

        <View style={styles.titleView}>
        <Text style={styles.title}>{JSON.stringify(deviceName)}</Text>
        </View>

        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabButton} onPress={toggleLoanRule}>
            <View style={styles.detailLayout}>
              <Text style={[styles.tabButtonText, { flex: 1 }]}>Loan Rules</Text>
              <Ionicons style={{ marginLeft: 'auto' }} name={loanRuleExpanded ? 'chevron-up' : 'chevron-down'} size={16} color={'#AC145A'} />
            </View>
          </TouchableOpacity>
          {loanRuleExpanded && (
            <View style={styles.detailRow}>            
                <View style={styles.detailRowLayout}>
                  <Text style={{ fontWeight: '500', flex: 2 }}>Standard Loan Duration:</Text>
                  <Text style={{ fontWeight:'300', flex: 1 }}>{device[0].standardLoanDuration} Days</Text>
                </View>
                <View style={styles.detailRowLayout}>
                  <Text style={{ fontWeight: '500', flex: 2 }}>Extension Allowance:</Text>
                  <Text style={{ fontWeight:'300', flex: 1 }}>
                    {parseInt(device[0].extensionAllowance) > 1 ? device[0].extensionAllowance + ' Times' : device[0].extensionAllowance + ' Time'}
                  </Text>
                </View>
            </View>
          )}
        </View>
        
        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabButton} onPress={toggleSummaryDetails}>
            <View style={styles.detailLayout}>
              <Text style={[styles.tabButtonText, { flex: 1 }]}>Summary Details</Text>
              <Ionicons style={{ marginLeft: 'auto' }} name={summaryDetailsExpanded ? 'chevron-up' : 'chevron-down'} size={16} color={'#AC145A'} />
            </View>
          </TouchableOpacity>
          {summaryDetailsExpanded && (
            <View style={styles.detailRow}>
              {Object.entries(summaryDetailsUnpacked).map(([key, value]) => (
                <View key={key} style={styles.detailRowLayout}>
                  <Text style={{ fontWeight:'500', flex: 1 }}>{key}:</Text>
                  <Text style={{ fontWeight:'300', flex: 2 }}>{value}</Text>
                </View>
              ))}
            </View>
          )}
        </View>


        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabButton} onPress={toggleDevicesID}>
            <View style={styles.detailLayout}>
              <Text style={[styles.tabButtonText, { flex: 1 }]}>Loan options</Text>
              <Ionicons style={{ marginLeft: 'auto' }} name={devicesIDExpanded ? 'chevron-up' : 'chevron-down'} size={16} color={'#AC145A'} />
            </View>
          </TouchableOpacity>
          {devicesIDExpanded && (
            <View style={styles.detailRow}>
            <View style={styles.detailRowLayout}>
              <Text style={{ fontWeight: "500", flex: 2 }}>Status:</Text>
              <Text style={{ fontWeight: "300", flex: 1 }}>{status}</Text>
            </View>
            <View style={styles.detailRowLayout}>
              <Text style={{ fontWeight: "500", flex: 2 }}>Return date:</Text>
              <Text style={{ fontWeight: "300", flex: 1 }}>{dueDate}</Text>
            </View>
            <View style={styles.detailRowLayout}>
              <Text style={{ fontWeight: "500", flex: 2 }}>Location:</Text>
              <Text style={{ fontWeight: "300", flex: 1 }}>MPEB 4.20</Text>
            </View>
          </View>
      )}
    </View>
    
    <View style={styles.buttonContainer}>
      <View style={styles.returnButtonWrapper}>
        <Button
          title="Return"
          color="#AC145A"
          onPress={() => setModalVisible(true)}
          disabled={status !== "Loaned" || isReturnButtonDisabled}
        />
      </View>
      <View style={styles.extendButtonWrapper}>
        <Button
          title="Extend"
          color="#AC145A"
          onPress={extendDevice}
          disabled={device[0].extensionAllowance === 0 || isExtendButtonDisabled}
        />
      </View>
    </View>


      </ScrollView>
    </View>  
  );
  
}

const styles =StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  titleView:{
    alignItems:'center',
    paddingHorizontal:50,
    paddingVertical: 10,
  },
  title:{
    fontSize:22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tabBar: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  tabButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#D6D6D6'
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: '700'
  },
  detailLayout:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailRow:{
    marginHorizontal: 30,
    marginTop: 10
  },
  detailRowLayout:{
    flexDirection: 'row',
    paddingVertical:2,
  },

  deviceKey:{
    fontWeight: '500',  
    lineHeight: 20, 
    fontSize: 16,
  },
  deviceID:{
    fontWeight: '300', 
    flex: 2, 
    lineHeight: 20,
    textDecorationLine: 'underline'
  },
  deviceState:{
    fontWeight: '300', 
    flex: 1, 
    lineHeight: 20, 
    textAlign:'center'
  },

  historyDeviceID:{
    fontWeight: '300', 
    flex: 1.1, 
    lineHeight: 20,
    textAlign:'left'
  },
  historyUserID:{
    fontWeight: '300', 
    flex: 0.6, 
    lineHeight: 20,
    textAlign:'center'
  },
  historyState:{
    fontWeight: '300', 
    flex: 1, 
    lineHeight: 20,
    textAlign:'right'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 250,
  },
  returnButtonWrapper: {
    marginRight: 30,
    backgroundColor: '#EBEDEF',
    borderRadius: 10,
    width: Dimensions.get('window').width * 0.35,
    paddingVertical: 5,
  },
  extendButtonWrapper: {
    marginLeft: 30,
    backgroundColor: '#EBEDEF',
    borderRadius: 10,
    width: Dimensions.get('window').width * 0.35,
    paddingVertical: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'gray', 
  },
  modalButton: {
    backgroundColor: 'white', 
    borderRadius: 5,
    padding: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
    borderBottomWidth: 1, 
    borderBottomColor: '#D6D6D6', 
  },
  modalButtonText: {
    color: '#AC145A', 
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalButtonNoBorder: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
  },
})



export default GeneralDeviceExtendScreen2