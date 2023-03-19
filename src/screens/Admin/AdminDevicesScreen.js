import { View, Text, ScrollView, TextInput, StyleSheet, FlatList } from 'react-native'
import React, {useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

const AllDevices = () => {

  const devices = [
    {
    name: 'Lenovo Legion Y9000P 2022 RTX 3070ti',
    Loaned: '10',
    Availabe: '5',
    },
    {
      name: 'Lenovo Legion Y9000P 2022 RTX 3070',
      Loaned: '6',
      Availabe: '9',
    },    
  ];

  const [input, setInput] = useState('');

  return(
    <ScrollView style={ styles.container }  contentInset={{ top: 0, bottom: 90 }}>
      <View style={styles.searchbar}>
        <Icon name="search" size={20} color="#000" />
        <TextInput
          value= {input} 
          onChangeText = {(text) => setInput(text)}
          style = {{fontSize: 15}}
          placeholder="Search"
        />
      </View>
      <View style={styles.list} >
        <FlatList data={devices} renderItem={({item}) => {
            if(input === ""){
              return (
                <View style={styles.line}>
                  <Text style={[styles.devices, {flex:3, textAlign: 'left'}]}>{item.name}</Text>
                  <Text style={[styles.devices, {flex:1, textAlign: 'center'}]}>{item.Loaned}</Text>
                  <Text style={[styles.devices, {flex:1, textAlign: 'center'}]}>{item.Availabe}</Text>
                </View>
              )
            }
            if(item.name.toLowerCase().includes(input.toLowerCase())){
              return (
                <View style={styles.line}>
                  <Text style={[styles.devices, {flex:3, textAlign: 'left'}]}>{item.name}</Text>
                  <Text style={[styles.devices, {flex:1, textAlign: 'center'}]}>{item.Loaned}</Text>
                  <Text style={[styles.devices, {flex:1, textAlign: 'center'}]}>{item.Availabe}</Text>
                </View>
              )
            }
        }}/>
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
  searchbar: {
    marginTop: 10,
    padding: 10,
    flexDirection: "row",
    width: '80%',
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    alignItems: 'center',
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
    paddingHorizontal: 10,
    flexDirection: 'row',
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
    </Stack.Navigator>
  )
}

export default AdminDevicesScreen