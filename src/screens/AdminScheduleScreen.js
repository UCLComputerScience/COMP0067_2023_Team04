import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AdminScheduleScreen = () => {
  const [currentTab, setCurrentTab] = useState('ongoing');
  const [filteredData, setFilteredData] = useState([]);

  const loanTable = [    { name: 'Lenovo Legion Y9000P 2022 RTX 3070ti', user: 'ucabj38', state: 'Loan', startDate: '2023-03-09'  },      
  { name: 'Lenovo Legion Y9000P 2022 RTX 3070ti', user: 'ucabj38', state: 'Loan', startDate: '2023-03-10'  },  ];

  const now = new Date();

  const filterData = (tab) => {
    const filtered = loanTable.filter((item) => {
      const startDate = new Date(item.startDate);
      const endDate = new Date(new Date().getTime() + (7 - new Date().getDay()) * 24 * 60 * 60 * 1000);
      if (tab === 'today') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return startDate.getTime() === today.getTime();
      } else {
        return startDate > now && startDate <= endDate;
      }
    });
    setFilteredData(filtered);
  };

  useState(() => {
    filterData(currentTab);
  }, []);

  const handleTabPress = (tab) => {
    setCurrentTab(tab);
    filterData(tab);
  };

  const handleRowPress = (index) => {
    console.log(`Clicked row ${index}`);
  };

  return (
    <View style={styles.container}>      
      <View style={styles.tabBar}>

        <TouchableOpacity
          style={[
            styles.tabButton,
            currentTab === 'today' && styles.activeTabButton,
            { marginLeft: -7 }
          ]}
          onPress={() => handleTabPress('today')}>
          <Text style={[styles.tabButtonText, { color: currentTab === 'today' ? '#000' : '#ccc' }]}>Today</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[            styles.tabButton,            currentTab === 'thisWeek' && styles.activeTabButton,            { marginRight: 13 }          ]}
          onPress={() => handleTabPress('thisWeek')}>
          <Text style={[styles.tabButtonText, { color: currentTab === 'thisWeek' ? '#000' : '#ccc' }]}>This week</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.separator]} />

        <View style={[styles.header]}>
          <Text style={[styles.headerText, { flex: 2 }]}>Device</Text>
          <Text style={[styles.headerText, { flex: 1, textAlign: 'center' }]}>User</Text>
          <Text style={[styles.headerText, { flex: 0.7, textAlign: 'center' }]}>State</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.dataContainer}>
          {filteredData.map((item, index) => (
            <TouchableOpacity
            style={styles.dataRow}
            key={index}
            onPress={() => handleRowPress(index)}>
              <Text style={[styles.deviceText, { flex: 2 }]}>{item.name}</Text>
              <Text style={[styles.userText, { flex: 1, textAlign: 'center' }]}>{item.user}</Text>
              <Text style={[styles.stateText, { flex: 0.7, textAlign: 'center' }]}>{item.state}</Text>
      </TouchableOpacity>
      ))}
    </View>
  </View>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  

  
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop: -5,
  },
  
  tabButton: {
    paddingHorizontal: 60,
    paddingVertical: 5,
  },
  
  activeTabButton: {

  },
  
  tabButtonText: {
    fontSize: 17,
  },
  
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginLeft: -25,
    marginRight: -25,

  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 30,
  },

  headerText: {
    fontSize: 14,
    color: '#ccc',
  },
  
  dataContainer: {


  },
  
  dataRow: {
    paddingHorizontal: 25,
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'left',
  },
  
  deviceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  
  userText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'right',
  },

  stateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'right',
  },
});

export default AdminScheduleScreen;