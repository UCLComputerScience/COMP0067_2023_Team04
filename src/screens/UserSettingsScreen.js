import React from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity } from "react-native";


const UserSettingsScreen =props=> {
  console.log(props);//显示prop属性
  console.log(props.navigation);//显示navigation属性
  return (
  <View>
    <Text style={styles.text}>HomeScreen</Text>
    <Button 
    onPress={()=> props.navigation.navigate('LoginTab')}//terminal日志会出现一行（）
    title = "Go to components demo" 
    />
  </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});


export default UserSettingsScreen