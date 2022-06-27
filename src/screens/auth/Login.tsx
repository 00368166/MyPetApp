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
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import Swal from 'sweetalert2'

import { StyleSheet } from "react-native";

import { Ionicons } from '@expo/vector-icons';
// CommonJS



export default function ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, "Login">) {
  const { isDarkmode, setTheme } = useTheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = React.useState(false);
  const [error_msg, setError] = useState<string>("");
  
  const toggleAlert = React.useCallback(() => {
    setVisible(!
      visible);
      
  }, [visible]);

  async function login() {
    console.log('aqui va el alert');
    setLoading(true);
    const { user, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });
    if (!error && !user) {
      setLoading(false);
      setError("Check your email for the login link!");
      toggleAlert();
     //alert("Check your email for the login link!");
    }
    if (error) {
      setLoading(false);
    //alert(error.message);
    
    setError(error.message);
    toggleAlert();
    }
    //alert(user.message);
    setError(user.message);
    toggleAlert();
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
            name={Platform.select({ ios: 'ios-close', android: 'md-close' })}
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
              //resizeMode="center"
              style={{
                height: 200,
                width: 400,
              }}
              source={require("../../../assets/images/login.jpg")}
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
              style={{
                alignSelf: "center",
                padding: 30,
              }}
              size="h1"
            >
              ¡Hola!
            </Text>

            <Text
              fontWeight="bold"
              style={{
                alignSelf: "center",
                padding: 30,
              }}
              size="h4"
            >
              Bienvenido a MyPet
            </Text>


            <Text>Email</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="ejemplo@correo.com"
              value={email}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />

            <Text style={{ marginTop: 15 }}>Password</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Ingresa tu contraseña"
              value={password}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
            <Button
              text={loading ? "Cargando" : "Iniciar sesión"}
              onPress={ () => {
                 login();
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
              <Text size="md">¿No tienes cuenta?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Register");
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                  }}
                >
                  Registrate aquí
                </Text>
              </TouchableOpacity>
            </View>
            
                        <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ForgetPassword");
                }}
              >
                <Text size="md" fontWeight="bold">
                  Olvide mi contraseña
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
    backgroundColor: '#C3272B',
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
    backgroundColor: '#C3272B',
    marginTop: 16,
    minWidth: '50%',
    paddingHorizontal: 16,
  },
  btnText: {
    color: '#FFFFFF',
  },
});
