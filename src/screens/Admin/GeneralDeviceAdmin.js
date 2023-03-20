import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

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

  return (
    <ScrollView style={styles.container} contentInset={{ top: 0, bottom: 90 }}>
      <View style={styles.titleView}>
        <Text style = {styles.title}>{deviceName}</Text>
      </View>
      <View style={{marginHorizontal:50}}>
      {Object.entries(summaryDetailsUnpacked).map(([key, value]) => (
        <View key={key} style={{ flexDirection: 'row' }}>
          <Text style={{ fontWeight: 'bold', flex: 1 }}>{key}:</Text>
          <Text style={{ flex: 2 }}>{value}</Text>
        </View>
      ))}
      </View>
    </ScrollView>
  )
}

const styles =StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleView:{
    alignItems:'center',
    paddingHorizontal:80,
    paddingVertical: 10
  },
  title:{
    fontSize:21,
    fontWeight: 'bold',
    textAlign: 'center',
  }
})

export default GeneralDeviceAdmin