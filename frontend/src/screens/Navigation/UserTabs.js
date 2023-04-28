import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import UserAppointmentScreen from "../User/UserAppointmentScreen";
import UserDevicesScreen from "../User/UserDevicesScreen";
import UserLoansScreen from "../User/UserLoansScreen";
import UserSettingsScreen from "../User/UserSettingsScreen";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      // floating bar
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 80,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="userDevice"
        component={UserDevicesScreen}
        options={{
          headerShown: true,
          headerTitle: "Devices",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Image
                source={require("../../components/icons/Devices.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#AC145A" : "#A6AAB2",
                }}
              />
              <Text
                style={{ color: focused ? "#AC145A" : "#A6AAB2", fontSize: 12 }}
              >
                Devices
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Appointment"
        component={UserAppointmentScreen}
        options={{
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Image
                source={require("../../components/icons/Schedule.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#AC145A" : "#A6AAB2",
                }}
              />
              <Text
                style={{ color: focused ? "#AC145A" : "#A6AAB2", fontSize: 12 }}
              >
                Appointment
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Loans1"
        component={UserLoansScreen}
        options={{
          headerShown: true,
          headerTitle: "Loans",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Image
                source={require("../../components/icons/Loans.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#AC145A" : "#A6AAB2",
                }}
              />
              <Text
                style={{ color: focused ? "#AC145A" : "#A6AAB2", fontSize: 12 }}
              >
                Loans
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={UserSettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Image
                source={require("../../components/icons/Settings.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#AC145A" : "#A6AAB2",
                }}
              />
              <Text
                style={{ color: focused ? "#AC145A" : "#A6AAB2", fontSize: 12 }}
              >
                Settings
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
