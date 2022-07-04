import React from "react";
import { View } from "react-native";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";


//import { Layout, Text } from "react-native-rapi-ui";
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
  return (
    <Layout>
      <View
      
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        
      >
        <Text>Aqui va a ir la informacion principal</Text>



        
      </View>
      
    </Layout>
  );
}
