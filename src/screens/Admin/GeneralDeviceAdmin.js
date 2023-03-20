import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { useRoute } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const GeneralDeviceAdmin = () => {

  const route = useRoute();
  const { deviceName } = route.params;

  const device = [{
    standardLoanDuration: 14,
    extensionAllowance: 1,
    summaryDetails: '{"CPU": "Intel Core i9-12900H Octo-core 20 threads", \
                      "GPU": "RTX 3070ti 8G 150W", \
                      "Memory": "DDR5 16GB 4800Hz Dual", \
                      "SSD": "SAMSUNG PM9A1 512GB", \
                      "Screen": "2.5K (2560*1600) 16:10 165Hz", \
                      "Power": "300W", \
                      "WIFI": "AX211"}'
  }]
  const summaryDetailsUnpacked = JSON.parse(device[0].summaryDetails);

  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <ScrollView style={styles.container} contentInset={{ top: 0, bottom: 90 }}>
      <View style={styles.titleView}>
        <Text style={styles.title}>{deviceName}</Text>
      </View>

      
      
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabButton} onPress={toggleExpand}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.tabButtonText, { flex: 1 }]}>Summary Details</Text>
            <Ionicons style={{ marginLeft: 'auto' }} name={expanded ? 'chevron-up' : 'chevron-down'} size={16} color={'#AC145A'} />
          </View>
        </TouchableOpacity>
        {expanded && (
          <View style={{ marginHorizontal: 50 }}>
            {Object.entries(summaryDetailsUnpacked).map(([key, value]) => (
              <View key={key} style={{ flexDirection: 'row', paddingVertical:2 }}>
                <Text style={{ fontWeight: '500', flex: 1 }}>{key}:</Text>
                <Text style={{ fontWeight:'300', flex: 2 }}>{value}</Text>
              </View>
            ))}
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
    paddingVertical: 10
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
    marginTop: -5,
  },
  tabButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: '700'
  },
})

export default GeneralDeviceAdmin