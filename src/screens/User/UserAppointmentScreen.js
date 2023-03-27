import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import GeneralDeviceUser from './GeneralDeviceUser';

const AllDevices = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const initialDevices = [
    {
      name: 'Lenovo Legion Y9000P 2022 RTX 3070ti',
      status: 'Loan',
      data: '2022-10-25',
    },
    {
      name: 'Lenovo Legion Y9000P 2022 RTX 3070',
      status: 'Loan',
      data: '2022-11-25',
    },
    {
      name: 'Lenovo Legion Y9000P 2022 RTX 3060',
      status: 'Loan',
      data: '2023-01-25',
    },
    {
      name: 'Dell XPS 13 2022',
      status: 'Return',
      data: '2023-02-25',
    },
    {
      name: 'MacBook Pro M1 2021',
      status: 'Return',
      data: '2023-03-25',
    },
           
  ];

  

  const [input, setInput] = useState('');
  const [devices, setDevices] = useState(initialDevices);
  const [sortOrder, setSortOrder] = useState('asc');
  const [loanedSortOrder, setLoanedSortOrder] = useState('asc');
  const [availableSortOrder, setAvailableSortOrder] = useState('asc');

  

  return(
    <View style={ styles.container}>
      
      <View style={styles.list} >
      <View style={{ marginVertical: 5, paddingHorizontal: 30, flexDirection: 'row' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 2.1 }}>
            <Text style={[styles.header, { textAlign: 'center' }]}>
              Devices
            </Text>
          </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: 30 }}>
          <Text style={[styles.header, { textAlign: 'center' }]}>status</Text>
         
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: 30 }}>
          <Text style={[styles.header, { textAlign: 'center' }]}>data</Text>
          
        </View>
      </View>
        <FlatList data={devices} renderItem={({item} ) => {
            if(input === ""){
              return (
                <TouchableOpacity onPress={() => navigation.navigate('GeneralDeviceUser', { deviceName: item.name })}>
                  <View style={styles.line}>
                    <Text style={[styles.devices, {flex:2.4, textAlign: 'left'}]}>{item.name}</Text>
                    <Text style={[styles.devices, {marginLeft:10, flex:1, textAlign: 'center'}]}>{item.status}</Text>
                    <Text style={[styles.devices, {marginRight:-10, flex:2, textAlign: 'center'}]}>{item.data}</Text>
                  </View>
                </TouchableOpacity>
              )
            }
            if(item.name.toLowerCase().includes(input.toLowerCase())){
              return (
                <View style={styles.line}>
                  <Text style={[styles.devices, {flex:2, textAlign: 'center'}]}>{item.name}</Text>
                  <Text style={[styles.devices, {flex:1, textAlign: 'center'}]}>{item.status}</Text>
                  <Text style={[styles.devices, {MARflex:1, textAlign: 'center'}]}>{item.data}</Text>
                </View>
              )
            }
        }}
        contentContainerStyle={{ paddingBottom: 170 }} 
        />
      </View>
    </View>
  );
}

const styles =StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchbar: {
    marginTop: 10,
    padding: 10,
    flexDirection: "row",
    width: '80%',
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    alignItems: 'center',
  },
  add:{
    marginLeft: 20,
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    flex: 1
  },
  search: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  list: {
    marginTop:10,
  },
  line:{
    marginVertical:15,
    paddingHorizontal: 30,
    flexDirection: 'row',
  },
  header:{
    fontSize: 12,
    fontWeight: 'bold', 
    color: '#A6AAB2',
  },
  devices:{
    fontSize: 16,
    fontWeight: 'bold',    
  }
})

const Stack = createStackNavigator();
const UserAppointmentScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="AllDevices" component={AllDevices} />
      <Stack.Screen name="GeneralDeviceUser" component={GeneralDeviceUser} />
    </Stack.Navigator>
  )
}

export default UserAppointmentScreen