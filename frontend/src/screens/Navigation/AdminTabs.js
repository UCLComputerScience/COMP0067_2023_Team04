import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AdminDevicesScreen from "../Admin/AdminDevicesScreen";
import AdminLoansScreen from "../Admin/AdminLoansScreen";
import AdminScanScreen from "../Admin/AdminScanScreen";
import AdminScheduleScreen from "../Admin/AdminScheduleScreen";
import AdminSettingsScreen from "../Admin/AdminSettingsScreen";

const Tab = createBottomTabNavigator();

const ScanButton = ({ children, onPress, focused }) => (
  <TouchableOpacity
    style={{
      top: 5,
      justifyContent: "center",
      alignContent: "center",
      //...styles.shadow
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 50,
        height: 50,
        borderRadius: 35,
        backgroundColor: "#D6D6D6",
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

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
          borderRadius: 15,
          ...styles.shadow,
          height: 80,
          backgroundColor: "#F5F6F7",
        },
      }}
    >
      <Tab.Screen
        name="AdminSchedule"
        component={AdminScheduleScreen}
        options={{
          headerShown: true,
          headerTitle: "Schedule",
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
                Schedule
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Loans"
        component={AdminLoansScreen}
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
        name="Scan"
        component={AdminScanScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../components/icons/Scan.png")}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: "#000",
              }}
            />
          ),
          tabBarButton: (props) => <ScanButton {...props} />,
        }}
      />

      <Tab.Screen
        name="AdminDevices"
        component={AdminDevicesScreen}
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
        name="Settings"
        component={AdminSettingsScreen}
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
