import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

const AllDevices = () => {
  return(
    <ScrollView style={ styles.container }  contentInset={{ top: 0, bottom: 90 }}>
      <View style={styles.searchbar}>
        <Icon name="search" size={20} color="#000" />
        <TextInput 
          style = {{fontSize: 15}}
          placeholder="Search"
        />
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