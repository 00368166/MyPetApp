import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SecondScreen from "../screens/SecondScreen";
import MainTabs from "./MainTabs";
import informascota from "../screens/informascota";

import agregarmascota from "../screens/agregarmascotas";

const MainStack = createNativeStackNavigator();
const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="SecondScreen" component={SecondScreen} />
      
      <MainStack.Screen name="infomascota" component={informascota} />
      <MainStack.Screen name="agregarmascotas" component={agregarmascota} />
    </MainStack.Navigator>
  );
};

export default Main;
