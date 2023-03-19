import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailDeviceAdmin from './DetailDeviceAdmin';
//import CollapsibleList from './AdminScanScreen';

const Stack = createStackNavigator();


const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const CollapsibleList = () => {
  const [expandedDays, setExpandedDays] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

  const handleExpand = day => {
    if (expandedDays.includes(day)) {
      setExpandedDays(expandedDays.filter(d => d !== day));
    } else {
      setExpandedDays([...expandedDays, day]);
    }
  };

  const loanTable = [
    {
      name: 'Lenovo Legion Y9000P 2022 RTX 3070ti',
      user: 'ucabj38',
      state: 'Loan',
      startDate: '2023-03-06'
    },
    {
      name: 'Lenovo Legion Y9000P 2022 RTX 3070ti',
      user: 'ucabj38',
      state: 'Loan',
      startDate: '2023-03-07'
    },
    {
      name: 'Lenovo Legion Y9000P 2022 RTX 3070ti',
      user: 'ucabj38',
      state: 'Loan',
      startDate: '2023-03-08'
    },
    {
      name: 'Lenovo Legion Y9000P 2022 RTX 3070ti',
      user: 'ucabj38',
      state: 'Loan',
      startDate: '2023-03-10'
    },
    {
      name: 'Lenovo Legion Y9000P 2022 RTX 3070ti',
      user: 'ucabj38',
      state: 'Loan',
      startDate: '2023-03-10'
    },
    {
      name: 'Lenovo Legion Y9000P 2022 RTX 3070ti',
      user: 'ucabj38',
      state: 'Loan',
      startDate: '2023-03-10'
    },
    {
      name: 'Lenovo Legion Y9000P 2022 RTX 3070ti',
      user: 'ucabj38',
      state: 'Loan',
      startDate: '2023-03-10'
    },
  ];

  const groupedLoans = loanTable.reduce((acc, loan) => {
    const date = new Date(loan.startDate);
    const day = DAYS[date.getUTCDay() - 1];

    if (!acc[day]) {
      acc[day] = [];
    }

    acc[day].push(loan);

    return acc;
  }, {});


const handleRowPress = (item) => {
    navigation.navigate('Detail', {
      user: item.user,
      state: item.state,
      startDate: item.startDate
    });
  };
  
  return (
    <ScrollView style={ styles.container }  contentInset={{ top: 0, bottom: 90 }}>
      <View style={styles.tabBar}>
        {DAYS.map(day => (
          <View key={day}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                expandedDays.includes(day) && styles.activeTabButton
              ]}
              onPress={() => handleExpand(day)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.tabButtonText, {flex:1}]}>{day}</Text>
                <Ionicons style = {{marginLeft: 'auto' }}  name={expandedDays.includes(day) ? 'chevron-up' : 'chevron-down'} size={25} color={'#AC145A'} />
              </View>
            </TouchableOpacity>
            {expandedDays.includes(day) && groupedLoans[day] && (
              <View style={styles.dataContainer}>
              {groupedLoans[day] && groupedLoans[day].map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dataRow}
                  onPress={() => handleRowPress(index)}
                >
                  <Text style={[styles.deviceText, { flex: 2 }]}>{item.name}</Text>
                  <Text style={[styles.userText, { flex: 1, textAlign: 'center' }]}>{item.user}</Text>
                  <Text style={[styles.stateText, { flex: 0.7, textAlign: 'center' }]}>{item.state}</Text>
                </TouchableOpacity>
              ))}
            </View>            
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
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
  activeTabButton: {},
  tabButtonText: {
    fontSize: 22,
    fontWeight: '700'
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
  dataContainer: {},
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

const AdminScanScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={CollapsibleList} />
      <Stack.Screen name="Detail" component={DetailDeviceAdmin} />
    </Stack.Navigator>
  )
}


export default AdminScanScreen