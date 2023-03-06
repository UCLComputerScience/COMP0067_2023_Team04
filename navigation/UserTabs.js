import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import UserDevicesScreen from '../src/screens/UserDevicesScreen';
import UserLoansScreen from '../src/screens/UserLoansScreen';
import UserAppointmentScreen from '../src/screens/UserAppointmentScreen';
import UserSettingsScreen from '../src/screens/UserSettingsScreen';

const Tab = createBottomTabNavigator();

const ScanButton = ({children, onPress}) => (
    <TouchableOpacity
        style={{
            top: 5,
            justifyContent: 'center',
            alignContent: 'center',
            //...styles.shadow
        }}
        onPress = {onPress}    
    >
        <View style={{
            width: 50,
            height: 50,
            borderRadius: 35,
            backgroundColor: '#D6D6D6'
        }}>
            {children}
        </View>

    </TouchableOpacity>
);

const UserTabs = () =>{
    return(
        <Tab.Navigator
            // floating bar
            screenOptions = {{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle:{
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                    height: 80,
                    ...styles.shadow
                }
            }}        
        >
            <Tab.Screen 
                name = "Devices"   
                component={UserDevicesScreen}  
                options={{
                tabBarIcon: ({focused}) =>(
                    <View style = {{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image 
                            source={require('../src/components/icons/Devices.png')}
                            resizeMode = 'contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#AC145A' : '#A6AAB2'
                            }}
                        />
                        <Text style = {{color: focused ? '#AC145A' : '#A6AAB2', fontSize:12}}>
                            Devices
                        </Text>
                    </View>
                )

            }} />


            <Tab.Screen 
                name = "Schedule"  
                component={UserAppointmentScreen} 
                options={{
                    tabBarIcon: ({focused}) =>(
                        <View style = {{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Image 
                                source={require('../src/components/icons/Schedule.png')}
                                resizeMode = 'contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#AC145A' : '#A6AAB2'
                                }}
                            />
                            <Text style = {{color: focused ? '#AC145A' : '#A6AAB2', fontSize:12}}>
                                Appointment
                            </Text>
                        </View>
                    )
    
                }}  />

            <Tab.Screen 
                name = "Loans"     
                component={UserLoansScreen}    
                options={{
                    tabBarIcon: ({focused}) =>(
                        <View style = {{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Image 
                                source={require('../src/components/icons/Loans.png')}
                                resizeMode = 'contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#AC145A' : '#A6AAB2'
                                }}
                            />
                            <Text style = {{color: focused ? '#AC145A' : '#A6AAB2', fontSize:12}}>
                                Loans
                            </Text>
                        </View>
                    )
    
                }} />
                 

            
            <Tab.Screen 
            name = "Settings"  
            component={UserSettingsScreen} 
            options={{
                tabBarIcon: ({focused}) =>(
                    <View style = {{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image 
                            source={require('../src/components/icons/Settings.png')}
                            resizeMode = 'contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#AC145A' : '#A6AAB2'
                            }}
                        />
                        <Text style = {{color: focused ? '#AC145A' : '#A6AAB2', fontSize:12}}>
                            Settings
                        </Text>
                    </View>
                )

            }}  />
        </Tab.Navigator>


    );

}

const styles = StyleSheet.create({
    shadow:{
        shadowColor: '#7F5DF0',
        shadowOffset:{
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})

export default UserTabs;