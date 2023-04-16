import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';


const UserSettingsScreen = () => {
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Are you sure?',
      'Are you sure you want to logout of the application?',
      [
        {
          text: 'YES',
          onPress: () => console.log('YES Pressed')
        },
        {
          text: 'NO',
          onPress: () => console.log('NO Pressed'),
          style: 'cancel'
        }
      ],
      { cancelable: false }
    )
  };

  const handleLogoutConfirm = () => {
    setIsLogoutModalVisible(false);
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalVisible(false);
  };

  return (
    <View style={styles.container}>


      
      <View style={styles.sectionContainer}>

        <TouchableOpacity style={styles.section} activeOpacity={0.8}>
          <Text style={styles.sectionTitle}>Personal Details</Text>
          <Text style={styles.sectionSubTitle}>&gt;</Text>
        </TouchableOpacity>

        <View style={styles.generalContainer}>
          <Text style={styles.generalTitle}>General</Text>
        </View>

        <TouchableOpacity style={styles.section} activeOpacity={0.8}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.sectionSubTitle}>Version 1.0.0 &gt;</Text>
        </TouchableOpacity>

      </View>

      <TouchableOpacity style={styles.section} activeOpacity={0.8} onPress={handleLogout}>
        <Text style={styles.sectionTitle}>Log Out</Text>
      </TouchableOpacity>
      
      </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },



  sectionContainer: {
    marginBottom: 30,
  },


  section: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },


  sectionTitle: {
    fontFamily: 'System',
    fontSize: 14,
    color: '#333',
  },


  sectionSubTitle: {
    fontSize: 14,
    color: '#ccc',
  },


  generalContainer: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },


  generalTitle: {
    paddingLeft: 12,
    fontSize: 12,
    color: '#333',
  },


  generalSubTitle: {
    fontSize: 20,
    color: '#ccc',
    marginLeft: 4,
  },
 
});
export default UserSettingsScreen;