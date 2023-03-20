import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GeneralDeviceAdmin from './GeneralDeviceAdmin';

const AllDevices = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const devices = [
    {
      name: 'Lenovo Legion Y9000P 2022 RTX 3070ti',
      loaned: '10',
      availabe: '5',
    },
    {
      name: 'Lenovo Legion Y9000P 2022 RTX 3070',
      loaned: '6',
      availabe: '9',
    },
    {
      name: 'Lenovo Legion Y9000P 2022 RTX 3060',
      loaned: '3',
      availabe: '8',
    },
    {
      name: 'Dell XPS 13 2022',
      loaned: '2',
      availabe: '3',
    },
    {
      name: 'MacBook Pro M1 2021',
      loaned: '5',
      availabe: '7',
    },
    {
      name: 'ASUS ROG Zephyrus S GX701',
      loaned: '4',
      availabe: '2',
    },
    {
      name: 'Lenovo Legion Y740',
      loaned: '6',
      availabe: '4',
    },
    {
      name: 'Acer Predator Helios 300',
      loaned: '7',
      availabe: '3',
    },
    {
      name: 'MSI GE76 Raider',
      loaned: '2',
      availabe: '8',
    },
    {
      name: 'Razer Blade Pro 17',
      loaned: '1',
      availabe: '9',
    },
    {
      name: 'Alienware m15 R4',
      loaned: '4',
      availabe: '6',
    },
    {
      name: 'HP Spectre x360',
      loaned: '0',
      availabe: '10',
    },        
  ];

  const [input, setInput] = useState('');

  return(
    <View style={ styles.container}>
      <View style={{paddingHorizontal:20}}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.searchbar}>
            <Icon name="search" size={20} color="#000" />
            <TextInput
              value= {input} 
              onChangeText = {(text) => setInput(text)}
              style = {{fontSize: 15}}
              placeholder="Search"
            />
          </View>
          <Ionicons style = {styles.add} size={25} name="add-circle-outline"/>
          <Ionicons style = {styles.add} size={25} name="stats-chart-outline"/>
        </View>
      </View>
      <View style={styles.list} >
        <View style={{marginVertical:5, paddingHorizontal: 30, flexDirection: 'row'}}>
          <Text style={[styles.header, {flex:3, textAlign: 'left'}]}>Devices</Text>
          <Text style={[styles.header, {flex:1, textAlign: 'center'}]}>Loaned</Text>
          <Text style={[styles.header, {flex:1, textAlign: 'center'}]}>Available</Text>
        </View>
        <FlatList data={devices} renderItem={({item} ) => {
            if(input === ""){
              return (
                <TouchableOpacity onPress={() => navigation.navigate('GeneralDeviceAdmin', { deviceName: item.name })}>
                  <View style={styles.line}>
                    <Text style={[styles.devices, {flex:3, textAlign: 'left'}]}>{item.name}</Text>
                    <Text style={[styles.devices, {flex:1, textAlign: 'center'}]}>{item.loaned}</Text>
                    <Text style={[styles.devices, {flex:1, textAlign: 'center'}]}>{item.availabe}</Text>
                  </View>
                </TouchableOpacity>
              )
            }
            if(item.name.toLowerCase().includes(input.toLowerCase())){
              return (
                <View style={styles.line}>
                  <Text style={[styles.devices, {flex:3, textAlign: 'left'}]}>{item.name}</Text>
                  <Text style={[styles.devices, {flex:1, textAlign: 'center'}]}>{item.loaned}</Text>
                  <Text style={[styles.devices, {flex:1, textAlign: 'center'}]}>{item.availabe}</Text>
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
const AdminDevicesScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="AllDevices" component={AllDevices} />
      <Stack.Screen name="GeneralDeviceAdmin" component={GeneralDeviceAdmin} />
    </Stack.Navigator>
  )
}

export default AdminDevicesScreen