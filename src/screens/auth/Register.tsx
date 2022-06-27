import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { supabase } from "../../lib/initSupabase";
import { AuthStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";

import { FancyAlert } from 'react-native-expo-fancy-alerts';

import { StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, "Register">) {
  const { isDarkmode, setTheme } = useTheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [visible, setVisible] = React.useState(false);
  
  const [visible2, setVisible2] = React.useState(false);
  const [error_msg, setError] = useState<string>("");
  
  const [error_msg2, setError2] = useState<string>("");
  const toggleAlert = React.useCallback(() => {
    setVisible(!
      visible);
      
  }, [visible]);
  const toggleAlert2 = React.useCallback(() => {
    setVisible2(!
      visible2);
      
  }, [visible2]);

  async function register() {
    setLoading(true);
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (!error && !user) {
      setLoading(false);
      console.log('si');
      //alert("Check your email for the login link!");
      setError("Check your email for the login link!");
    toggleAlert();
    }
    if (error) {
      setLoading(false);
      //alert(error.message);
      setError2(error.message);
    toggleAlert2();
    }
    else {
      setError("Check your email for the verification link!");
    toggleAlert();
    }
  }
  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
      <FancyAlert
  visible={visible}
      style={styles.alert}
      icon={
        <View style={[ styles.icon, { borderRadius: 32 } ]}>
          
          <Ionicons
            name={Platform.select({ ios: 'ios-check', android: 'md-check' })}
            size={36}
            color="#FFFFFF"
          />
        </View>
      } 
    >
      <View style={styles.content}>
        <Text style={styles.contentText}>{error_msg}</Text>
  
        <TouchableOpacity style={styles.btn} onPress={toggleAlert}>
          <Text style={styles.btnText}>OK</Text>
        </TouchableOpacity>
      </View>
    </FancyAlert>
    <FancyAlert
  visible={visible2}
      style={styles.alert}
      icon={
        <View style={[ styles.iconmalo, { borderRadius: 32 } ]}>
          
          <Ionicons
            name={Platform.select({ ios: 'ios-info', android: 'md-info' })}
            size={36}
            color="#FFFFFF"
          />
        </View>
      } 
    >
      <View style={styles.content}>
        <Text style={styles.contentText}>{error_msg2}</Text>
  
        <TouchableOpacity style={styles.btnmalo} onPress={toggleAlert2}>
          <Text style={styles.btnText}>OK</Text>
        </TouchableOpacity>
      </View>
    </FancyAlert>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                height: 220,
                width: 220,
              }}
              source={require("../../../assets/images/register.jpg")}
            />
          </View>
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 20,
              backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
            }}
          >
            <Text
              fontWeight="bold"
              size="h3"
              style={{
                alignSelf: "center",
                padding: 30,
              }}
            >
              Crear cuenta
            </Text>

            <Text
              fontWeight="italic"
              size="h3"
              style={{
                alignSelf: "center",
                padding: 30,
              }}
            >
              Ingresa tu informacion
            </Text>

            <Text>Email</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Ingresa tu email"
              value={email}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />

            <Text style={{ marginTop: 15 }}>Contraseña</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Ingresa tu nueva contraseña"
              value={password}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
            <Button
              text={loading ? "Enviado" : "Crear cuenta"}
              onPress={() => {
                register();
              }}
              style={{
                marginTop: 20,
                height: 50,
                margin: "30%",
              }}
              
              status="info"
              disabled={loading}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: -30,
                justifyContent: "center",
              }}
            >
              <Text size="md">¿Ya tienes cuenta?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                  }}
                >
                  Iniciar sesión
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  isDarkmode ? setTheme("light") : setTheme("dark");
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                  }}
                >
                  {isDarkmode ? "☀️ Modo brillante" : "🌑 Modo oscuro"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  alert: {
    backgroundColor: '#EEEEEE',
  },
  icon: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3ED60B',
    width: '100%',
  },
  iconmalo: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFA00B',
    width: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -16,
    marginBottom: 16,
  },
  contentText: {
    textAlign: 'center',
  },
  btn: {
    borderRadius: 32,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignSelf: 'stretch',
    backgroundColor: '#3ED60B',
    marginTop: 16,
    minWidth: '50%',
    paddingHorizontal: 16,
  },
  btnmalo: {
    borderRadius: 32,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignSelf: 'stretch',
    backgroundColor: '#EFA00B',
    marginTop: 16,
    minWidth: '50%',
    paddingHorizontal: 16,
  },
  btnText: {
    color: '#FFFFFF',
  },
});
