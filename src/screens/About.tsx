import React, {useState} from 'react';
import { View, Linking, StyleSheet } from "react-native";
import { MainStackParamList } from "../types/navigation";

import { supabase } from "../lib/initSupabase";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  TextInput,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";

import { Ionicons } from "@expo/vector-icons";

export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
  const { isDarkmode, setTheme } = useTheme();
  
  const [userName, setUserName] = useState('AboutReact');
  return (
    <Layout>
      <TopNav
        middleContent=
        {
          <Text size="md" fontWeight="bold" size="h2" style={styles.upcontent}>
          Mis mascotas
        </Text>
        }
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Section style={styles.seccion}>
          <SectionContent>
            <Text style={styles.contenido}>
              Mypet
            </Text>
            <Text style={styles.texto}>Aplicacion para mascotas</Text>
          <Button
              status="danger"
              text="Cerrar sesión"
              onPress={async () => {
                const { error } = await supabase.auth.signOut();
                if (!error) {
                 // alert("Signed out!");
                }
                if (error) {
                  alert(error.message);
                }
              }}
              style={{
                marginTop: 10,
              }}
            />
          </SectionContent>
        </Section>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  upcontent:{
    
padding: 1,
color: "#49392C"
  },
  contenido: {
    alignSelf: "center"
  },
  seccion: {
    padding: 15
  },
  texto:{
    padding: 10
  }
});

