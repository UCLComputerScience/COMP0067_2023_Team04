import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, {useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GeneralDeviceUser from './GeneralDeviceUser';

const AllDevices = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const initialDevices = [
    {
      name: 'Lenovo Legion Y9000P 2022 RTX 3070ti',
      launchedyear: '2021',
      availabe: '5',
    },
    {
      name: 'Lenovo Legion Y9000P 2022 RTX 3070',
      launchedyear: '2022',
      availabe: '9',
    },
    {
      name: 'Lenovo Legion Y9000P 2022 RTX 3060',
      launchedyear: '2023',
      availabe: '8',
    },
    {
      name: 'Dell XPS 13 2022',
      launchedyear: '2022',
      availabe: '3',
    },
    {
      name: 'MacBook Pro M1 2021',
      launchedyear: '2021',
      availabe: '7',
    },
    {
      name: 'ASUS ROG Zephyrus S GX701',
      launchedyear: '2022',
      availabe: '2',
    },
    {
      name: 'Lenovo Legion Y740',
      launchedyear: '2023',
      availabe: '4',
    },
    {
      name: 'Acer Predator Helios 300',
      launchedyear: '2021',
      availabe: '3',
    },
    {
      name: 'MSI GE76 Raider',
      launchedyear: '2021',
      availabe: '8',
    },
    {
      name: 'Razer Blade Pro 17',
      launchedyear: '2022',
      availabe: '9',
    },
    {
      name: 'Alienware m15 R4',
      launchedyear: '2020',
      availabe: '6',
    },
    {
      name: 'HP Spectre x360',
      launchedyear: '2018',
      availabe: '10',
    },        
  ];

  const handleicon = () => {
    Alert.alert(
      'Contact information',
      'Email: uclcsdevice@ucl.ac.uk\nPhone: +44 07412356987\nAddress: MP Engineering Building',
      [
        {
          text: 'YES',
          onPress: () => console.log('YES Pressed'),
          style: 'cancel'
        }
      ],
      { 
        cancelable: false,
        
      }
    )
  };

  const [input, setInput] = useState('');
  const [devices, setDevices] = useState(initialDevices);
  const [sortOrder, setSortOrder] = useState('asc');
  const [loanedSortOrder, setLoanedSortOrder] = useState('asc');
  const [availableSortOrder, setAvailableSortOrder] = useState('asc');

  const sortDevices = (order) => {
    const sortedDevices = [...devices].sort((a, b) => {
      if (order === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setDevices(sortedDevices);
  };

  const sortDevicesByLoaned = (order) => {
    const sortedDevices = [...devices].sort((a, b) => {
      if (order === 'asc') {
        return a.launchedyear - b.launchedyear;
      } else {
        return b.launchedyear - a.launchedyear;
      }
    });
    setDevices(sortedDevices);
  };

  

  const sortDevicesByAvailable = (order) => {
    const sortedDevices = [...devices].sort((a, b) => {
      if (order === 'asc') {
        return a.availabe - b.availabe;
      } else {
        return b.availabe - a.availabe;
      }
    });
    setDevices(sortedDevices);
  };

  const handleLoanedSort = () => {
    const newSortOrder = loanedSortOrder === 'asc' ? 'desc' : 'asc';
    setLoanedSortOrder(newSortOrder);
    sortDevicesByLoaned(newSortOrder);
  };

  const handleAvailableSort = () => {
    const newSortOrder = availableSortOrder === 'asc' ? 'desc' : 'asc';
    setAvailableSortOrder(newSortOrder);
    sortDevicesByAvailable(newSortOrder);
  };

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
          <TouchableOpacity onPress={handleicon}>
          <Ionicons style = {styles.add} size={25} name="information-circle-outline"/>
          
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.list} >
      <View style={{ marginVertical: 5, paddingHorizontal: 30, flexDirection: 'row' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 3 }}>
            <Text style={[styles.header, { textAlign: 'left' }]}>
              Devices
            </Text>
          </View>
        <TouchableOpacity onPress={handleLoanedSort} style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: 20 }}>
          <Text style={[styles.header, { textAlign: 'center' }]}>Launched year</Text>
          <Ionicons name={`chevron-${loanedSortOrder === 'asc' ? 'up' : 'down'}-outline`} size={15} color="#AC145A" style={{ marginHorizontal: 0 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAvailableSort} style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: 30 }}>
          <Text style={[styles.header, { textAlign: 'center' }]}>Available</Text>
          <Ionicons name={`chevron-${availableSortOrder === 'asc' ? 'up' : 'down'}-outline`} size={15} color="#AC145A" style={{ marginHorizontal: 0 }} />
        </TouchableOpacity>
      </View>
        <FlatList data={devices} renderItem={({item} ) => {
            if(input === ""){
              return (
                <TouchableOpacity onPress={() => navigation.navigate('GeneralDeviceUser', { deviceName: item.name })}>
                  <View style={styles.line}>
                    <Text style={[styles.devices, {flex:2.4, textAlign: 'left'}]}>{item.name}</Text>
                    <Text style={[styles.devices, {marginLeft:-20, flex:1, textAlign: 'center'}]}>{item.launchedyear}</Text>
                    <Text style={[styles.devices, {marginRight:-5, flex:0.9, textAlign: 'center'}]}>{item.availabe}</Text>
                  </View>
                </TouchableOpacity>
              )
            }
            if(item.name.toLowerCase().includes(input.toLowerCase())){
              return (
                <View style={styles.line}>
                  <Text style={[styles.devices, {flex:3, textAlign: 'left'}]}>{item.name}</Text>
                  <Text style={[styles.devices, {flex:1, textAlign: 'center'}]}>{item.launchedyear}</Text>
                  <Text style={[styles.devices, {MARflex:1, textAlign: 'center'}]}>{item.availabe}</Text>
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
const UserDevicesScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="AllDevices" component={AllDevices} />
      <Stack.Screen name="GeneralDeviceUser" component={GeneralDeviceUser} />
    </Stack.Navigator>
  )
}

export default UserDevicesScreen