import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createStackNavigator } from '@react-navigation/stack';

const GeneralDeviceUser = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const deviceName = route.params;

  const device = [{
    standardLoanDuration: 14,
    extensionAllowance: 1,
    summaryDetails: '{"CPU": "Intel Core i9-12900H Octo-core 20 threads", \
                      "GPU": "RTX 3070ti 8G 150W", \
                      "Memory": "DDR5 16GB 4800Hz Dual", \
                      "SSD": "SAMSUNG PM9A1 512GB", \
                      "Screen": "2.5K (2560*1600) 16:10 165Hz", \
                      "Power": "300W", \
                      "WIFI": "AX211"}',
  }]

  
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
  

  return (
    <ScrollView style={styles.container} contentInset={{ bottom: 100 }}>

      <View style={styles.titleView}>
        <Text style={styles.title}>{deviceName}</Text>
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
            <Text style={{ fontWeight: '500', flex: 2 }}>Status:</Text>
            <Text style={{ fontWeight:'300', flex: 1 }}>Available</Text>
          </View>
          
      </View>
    )}
  </View>

      
      



    </ScrollView>
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
})

const Stack = createStackNavigator();

const GeneralDeviceUserScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="General" component={GeneralDeviceUser} />
      
    </Stack.Navigator>
  )
}

export default GeneralDeviceUserScreen