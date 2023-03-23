import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GeneralDeviceAdmin from './GeneralDeviceAdmin';

const AllDevices = () => {
  const navigation = useNavigation();
  const initialDevices = [
    {
      name: 'Lenovo Legion Y9000P 2022 RTX 3070ti',
      loaned: '10',
      availabe: '5',
      category: 'Laptop',
    },
    {
      name: 'Lenovo Legion Y9000P 2022 RTX 3070',
      loaned: '6',
      availabe: '9',
      category: 'Laptop',
    },
    {
      name: 'Lenovo Legion Y9000P 2022 RTX 3060',
      loaned: '3',
      availabe: '8',
      category: 'Laptop',
    },
    {
      name: 'Dell XPS 13 2022',
      loaned: '2',
      availabe: '3',
      category: 'Laptop',
    },
    {
      name: 'MacBook Pro M1 2021',
      loaned: '5',
      availabe: '7',
      category: 'MacBook',
    },
    {
      name: 'ASUS ROG Zephyrus S GX701',
      loaned: '4',
      availabe: '2',
      category: 'Laptop',
    },
    {
      name: 'Lenovo Legion Y740',
      loaned: '6',
      availabe: '4',
      category: 'Laptop',
    },
    {
      name: 'Acer Predator Helios 300',
      loaned: '7',
      availabe: '3',
      category: 'Laptop',
    },
    {
      name: 'MSI GE76 Raider',
      loaned: '2',
      availabe: '8',
      category: 'Laptop',
    },
    {
      name: 'Razer Blade Pro 17',
      loaned: '1',
      availabe: '9',
      category: 'Laptop',
    },
    {
      name: 'Alienware m15 R4',
      loaned: '4',
      availabe: '6',
      category: 'Laptop',
    },
    {
      name: 'HP Spectre x360',
      loaned: '0',
      availabe: '10',
      category: 'Laptop',
    },        
  ];

  const [input, setInput] = useState('');
  const [devices, setDevices] = useState(initialDevices);
  const [sortOrder, setSortOrder] = useState('asc');
  const [loanedSortOrder, setLoanedSortOrder] = useState('asc');
  const [availableSortOrder, setAvailableSortOrder] = useState('asc');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
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
        return a.loaned - b.loaned;
      } else {
        return b.loaned - a.loaned;
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

  const filterDevicesByCategory = (category) => {
    if (category === 'All') {
      setDevices(initialDevices);
    } else {
      const filteredDevices = initialDevices.filter((device) => device.category === category);
      setDevices(filteredDevices);
    }
  };

  const handleCategoryTabPress = (category) => {
    setSelectedCategory(category);
    filterDevicesByCategory(category);
  };
  
  return (
  <View style={styles.container}>
    <View style={{ paddingHorizontal: 20 }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.searchbar}>
        <Icon name="search" size={20} color="#000" />
        <TextInput
        value={input}
        onChangeText={(text) => setInput(text)}
        style={{ fontSize: 15 }}
        placeholder="Search"
        />
        </View>
        <Ionicons style={styles.add} size={25} name="add-circle-outline" />
        <Ionicons style={styles.add} size={25} name="stats-chart-outline" />
      </View>
    </View>
  <View style={styles.categoryTabs}>
    {['All', 'Laptop', 'MacBook'].flatMap((category, index) => {
      const components = [
        <TouchableOpacity
          key={category}
          onPress={() => handleCategoryTabPress(category)}
          style={[
          styles.categoryTab,
          selectedCategory === category ? styles.selectedCategoryTab : null,
          ]}
        >
          <Text
            style={[
            styles.categoryTabText,
            selectedCategory === category ? styles.selectedCategoryTabText : null,
            ]}
            >
            {category}
          </Text>
        </TouchableOpacity>
      ];
      
      if (index < 2) {
        components.push(
          <View key={`separator-${index}`} style={styles.separator} />
        );
      }
      return components;
    })}
  </View>

  <View style={styles.list}>
    <View style={{ marginVertical: 5, paddingHorizontal: 30, flexDirection: 'row' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 3 }}>
        <Text style={[styles.header, { textAlign: 'left' }]}>
          Devices
        </Text>
      </View>
      <TouchableOpacity onPress={handleLoanedSort} style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <Text style={[styles.header, { textAlign: 'center' }]}>Loaned</Text>
        <Ionicons name={`chevron-${loanedSortOrder === 'asc' ? 'up' : 'down'}-outline`} size={15} color="#AC145A" style={{ marginHorizontal: 0 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAvailableSort} style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <Text style={[styles.header, { textAlign: 'center' }]}>Available</Text>
        <Ionicons name={`chevron-${availableSortOrder === 'asc' ? 'up' : 'down'}-outline`} size={15} color="#AC145A" style={{ marginHorizontal: 0 }} />
      </TouchableOpacity>
    </View>
    <FlatList
      data={devices}
      renderItem={({ item }) => {
        if (input === '') {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('GeneralDeviceAdmin', { deviceName: item.name })}>
              <View style={styles.line}>
                <Text style={[styles.devices, { flex: 2.4, textAlign: 'left' }]}>{item.name}</Text>
                <Text style={[styles.devices, { flex: 1, textAlign: 'center' }]}>{item.loaned}</Text>
                <Text style={[styles.devices, { flex: 1, textAlign: 'center' }]}>{item.availabe}</Text>
              </View>
            </TouchableOpacity>
          );
        }
        if (item.name.toLowerCase().includes(input.toLowerCase())) {
          return (
            <View style={styles.line}>
              <Text style={[styles.devices, { flex: 3, textAlign: 'left' }]}>{item.name}</Text>
              <Text style={[styles.devices, { flex: 1, textAlign: 'center' }]}>{item.loaned}</Text>
              <Text style={[styles.devices, { flex: 1, textAlign: 'center' }]}>{item.availabe}</Text>
            </View>
          );
        }
      }}
      contentContainerStyle={{ paddingBottom:170 }}
      />
      </View>
  </View>
  );
};
      
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchbar: {
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    alignItems: 'center',
  },
  add: {
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    flex: 1,
  },
  list: {
    marginTop: 10,
  },
  line: {
    marginVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
  },
  header: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#A6AAB2',
  },
  devices: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  categoryTab: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  selectedCategoryTab: {},
  categoryTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A6AAB2',
  },
  selectedCategoryTabText: {
    color: '#000',
  },
  separator: {
    height: '100%',
    width: 1,
    backgroundColor: '#A6AAB2',
    alignSelf: 'center',
  },

});
  
  const Stack = createStackNavigator();
  const AdminDevicesScreen = () => {
  return (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
  <Stack.Screen name="AllDevices" component={AllDevices} />
  <Stack.Screen name="GeneralDeviceAdmin" component={GeneralDeviceAdmin} />
  </Stack.Navigator>
  );
  };
    
    export default AdminDevicesScreen;