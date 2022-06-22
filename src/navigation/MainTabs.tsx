import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { themeColor, useTheme, Text } from "react-native-rapi-ui";
import TabBarIcon from "../components/utils/TabBarIcon";
import TabBarText from "../components/utils/TabBarText";

import { MaterialCommunityIcons } from '@expo/vector-icons';
import Home from "../screens/Home";
import About from "../screens/About";
import Profile from "../screens/Profile";
import pets from "../screens/pets";

const Tabs = createBottomTabNavigator();
const colora = '#97D8C4';
const colorb = '#6B9AC4';
const MainTabs = () => {
  const { isDarkmode } = useTheme();
  return (
    <Tabs.Navigator
    initialRouteName="Inicio"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",
          backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
        },
      }}
      
      >
      
      <Tabs.Screen
       name="Home"
       component={Home}
       options={{
         tabBarLabel: ({ focused, size }) => {
          const color = focused ? colora : colorb;
          return (
           // <TabBarIcon icon={icon} color={color} size={size} />
           // <TabBarText  title="Mis mascotas"/>
             <Text fontWeight='medium' size='sm' style={{color: color}}>
                  Inicio
                </Text>
          );
        },
         tabBarIcon: ({ focused, size }) => {
           const icon = focused ? 'home-account' : 'home';
           const color = focused ? colora : colorb;
           return (
            
            <MaterialCommunityIcons name={icon} color={color} size={size} />
            // <TabBarIcon icon={icon} style={{color: color}} size={size} />
           );
         },
       }}
      />
      
      <Tabs.Screen
      name="Pets"
      component={pets}
      options={{
        tabBarLabel: ({ focused, size }) => {
         const color = focused ? colora : colorb;
         return (
          // <TabBarIcon icon={icon} color={color} size={size} />
          // <TabBarText  title="Mis mascotas"/>
            <Text fontWeight='medium' size='sm' style={{color: color}}>
                 Mis mascotas
               </Text>
         );
       },
        tabBarIcon: ({ focused, size }) => {
          const icon = focused ? 'dog' : 'dog-side';
          const color = focused ? colora : colorb;
          return (
           
           <MaterialCommunityIcons name={icon} color={color} size={size} />
           // <TabBarIcon icon={icon} style={{color: color}} size={size} />
          );
        },
      }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: ({ focused, size }) => {
           const color = focused ? colora : colorb;
           return (
            // <TabBarIcon icon={icon} color={color} size={size} />
            // <TabBarText  title="Mis mascotas"/>
              <Text fontWeight='medium' size='sm' style={{color: color}}>
                   Mi contacto
                 </Text>
           );
         },
          tabBarIcon: ({ focused, size }) => {
            const icon = focused ? 'account-box' : 'account';
            const color = focused ? colora : colorb;
            return (
             
             <MaterialCommunityIcons name={icon} color={color} size={size} />
             // <TabBarIcon icon={icon} style={{color: color}} size={size} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="About"
        component={About}
        options={{
          tabBarLabel: ({ focused, size }) => {
           const color = focused ? colora : colorb;
           return (
            // <TabBarIcon icon={icon} color={color} size={size} />
            // <TabBarText  title="Mis mascotas"/>
              <Text fontWeight='medium' size='sm' style={{color: color}}>
                   Acerca de
                 </Text>
           );
         },
          tabBarIcon: ({ focused, size }) => {
            const icon = focused ? 'information' : 'information-outline';
            const color = focused ? colora : colorb;
            return (
             
             <MaterialCommunityIcons name={icon} color={color} size={size} />
             // <TabBarIcon icon={icon} style={{color: color}} size={size} />
            );
          },
        }}
      />
    </Tabs.Navigator>
  );
};


export default MainTabs;
