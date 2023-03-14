import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';



const UserLoansScreen = () => {
  const [currentTab, setCurrentTab] = useState('ongoing');
  const [filteredData, setFilteredData] = useState([]);

  const data = [
    { device: 'Lenovo Legion Y9000P 2022 RTX 3070ti', dueDate: '2023-03-01' },
    { device: 'iPad Pro', dueDate: '2023-04-05' },
    { device: 'MacBook Air', dueDate: '2023-06-01' },
  ];

  const now = new Date();

  const filterData = (tab) => {
    const filtered = data.filter((item) => {
      const dueDate = new Date(item.dueDate);
      if (tab === 'ongoing') {
        return dueDate >= now;
      } else {
        return dueDate < now;
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
            currentTab === 'ongoing' && styles.activeTabButton,
            { marginLeft: -7 }
          ]}

          onPress={() => handleTabPress('ongoing')}>
          <Text style={[styles.tabButtonText, { color: currentTab === 'ongoing' ? '#000' : '#ccc' }]}>Ongoing</Text>

        </TouchableOpacity>
        
        <TouchableOpacity

          style={[
            styles.tabButton,
            currentTab === 'past' && styles.activeTabButton,
            { marginRight: 13 }
          ]}
          onPress={() => handleTabPress('past')}>
          <Text style={[styles.tabButtonText, { color: currentTab === 'past' ? '#000' : '#ccc' }]}>Past</Text>
        
        </TouchableOpacity>
      
      
      </View>

      <View style={[styles.separator]} />

        <View style={[styles.header]}>
          <Text style={[styles.headerText, { flex: 1 }]}>Device</Text>
          <Text style={[styles.headerText, { flex: 1, textAlign: 'right' }]}>Due date</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.dataContainer}>
          {filteredData.map((item, index) => (
            
            <TouchableOpacity
            style={styles.dataRow}
            key={index}
            onPress={() => handleRowPress(index)}>
            <Text style={[styles.deviceText, { flex: 1 }]}>{item.device}</Text>
            <Text style={[styles.dueDateText, { marginRight: 15, flex: 1, textAlign: 'right' }]}>{item.dueDate}</Text>
          
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
    marginLeft: -20,
    marginRight: -20,
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 60,
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
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  
  deviceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  
  dueDateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'right',
  },
});

export default UserLoansScreen;