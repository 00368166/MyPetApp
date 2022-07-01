import React, { useEffect,useState } from "react";
import { StatusBar } from "expo-status-bar";

import { Avatar } from 'react-native-elements';
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

import * as SecureStore from 'expo-secure-store';
// CommonJS

import * as LocalAuthentication from 'expo-local-authentication';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


type state = {
  compatible: false,
  fingerprints: false,
  result: ''
}


export default function ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, "Login">) {
  const { isDarkmode, setTheme } = useTheme();
  const [email, setEmail] = useState<string>("");
  const [password_temp,setPasswordtemp] = useState<String>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = React.useState(false);
  const [error_msg, setError] = useState<string>("");
  const [email_visible, setEmailVisible] = useState<string>("flex");
  const [sesionPreviaVisible, setSesionPrevVisible] = useState<String>("none");
  const [sesionPrevia, setSesionPrevia] = useState<String>('');
  const [secureemail, setsecureemail] = useState<String>('securityemail');
  
  const [securePassword, setSecurePassword] = useState<String>('securityPassword');
  const [securityEmail, setSecurityemail] = useState<String>('');
  const [securityPassword, setSecurityPassword] = useState<String>('');
  const [resultado, setResultado] = useState<String>('');

  const [fingerprintVisible, setVisibleFingerprint] = useState<String>('none');
  const [flagfinger, setflag] = useState<boolean>(false);

  const toggleAlert = React.useCallback(() => {
    setVisible(!
      visible);
      
  }, [visible]);

  useEffect(() => {
    
   // console.log('check');
    check();
    //console.log('return useEffect' + result);
  }, []);
  async function check(){
    const result = getValueFor(secureemail);
    if(result){
      result.then((espera) => {setSecurityemail(espera);
      console.log('encontrado email' + securityEmail);
      
      const pass = getValueFor(securePassword);
      if(pass){
        pass.then((espera_2) => {setSecurityPassword(espera_2);
        console.log('encontrado contraseña' + securityPassword);
        setEmail(espera);
        setPasswordtemp(espera_2);
      if(espera != null || espera_2 != null){
        change_views();
        check_fingerprint();
      }

        });
      }

      });
    }
      //setResultado(result);
     
  }

  function cambio() {
    setPassword(password_temp);
    console.log(email + ' ' + password);
  }


  const emial_change = React.useCallback(() => {
    if(email_visible == 'flex'){
      setEmailVisible("none");
    }
    else{
      setEmailVisible("flex");
    }
    
}, [email_visible]);

const sesion_change = React.useCallback(() => {
  if(sesionPreviaVisible == 'flex'){
    setSesionPrevVisible("none");
  }
  else{
    setSesionPrevVisible("flex");
  }
  
}, [sesionPreviaVisible]);

const fingerprintchange = React.useCallback(() => {
  if(fingerprintVisible == 'flex'){
    setVisibleFingerprint("none");
  }
  else{
    setVisibleFingerprint("flex");
  }
  
}, [fingerprintVisible]);

const change_views = async () => {
  sesion_change();
  emial_change();
  console.log("invertir");
  
};

async function save(secure_key,secure_string) {
  await SecureStore.setItemAsync(secure_key, secure_string);
}

async function getValueFor(secure_key) {
  console.log('check getValue');
  const result = await SecureStore.getItemAsync(secure_key);
  return result;
}

async function delete_securitykey(secure_key) {
  await SecureStore.deleteItemAsync(secure_key);
}


function check_fingerprint(){
  const result = LocalAuthentication.hasHardwareAsync();
  if(result){
    result.then((espera) => {
      setVisibleFingerprint("flex");
    });
  }

  
}
  async function login() {
    console.log(securityEmail + ' y ' + securityPassword);
    /*
    
    
    
    */
    
      
    
    
  //const rest = async () => { await console.log(getValueFor('perro')); };

  //console.log(rest);

    
    console.log('aqui va el alert');
    setLoading(true);
    const { user, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });
    if (!error && !user) {
      setLoading(false);
      setError("Se ah enviado tu correo para revision");
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
    if(user){
      const result_2 = save(secureemail,email);
    if(result_2){
      console.log('save email ' + securityEmail);
      };
      
    const result_3 = save(securePassword,password);
    if(result_3){
      console.log('save password ' + securityPassword);
      };
      console.log('logeado');
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
            
            <View style={{display: email_visible}}> 
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
            </View>
            <View style={{display: sesionPreviaVisible}}> 
            <Text
              fontWeight="bold"
              style={{
                alignSelf: "center",
                padding: 30,
              }}
              size="h1"
            >
              ¡Has vuelto!
            </Text>

            <Text
              fontWeight="bold"
              style={{
                alignSelf: "center",
                padding: 5,
              }}
              size="h4"
            >
              Bienvenido devuelta: 
            </Text>

            <Text
              fontWeight="bold"
              style={{
                alignSelf: "center",
              }}
              size="h3"
            >
              {email}
            </Text>
            
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
                height: 50,
                margin: "30%",
                marginTop: 10,
                marginBottom: 10
              }}
              status="info"
              disabled={loading}
            />
            
            <View style={{display: fingerprintVisible}}>
            <Avatar
  source={{
    uri:
      'https://www.nicepng.com/png/detail/440-4408167_fingerprint-png-download-png-image-with-transparent-ios.png',
  }}
  
  onPress={() => {
    
  if(flagfinger == true){
    setPassword(password_temp);
    setflag(false);
login();

  }
    const result = LocalAuthentication.authenticateAsync();
    console.log(result);
  if(result){
    result.then((espera) => {
      console.log(espera);
      if(espera.success == true){
        //cambio();
        console.log(email + ' ' + password);
        setflag(true);
        //
      }
    });
  }
  }}
  containerStyle={{alignSelf: "center",}}
  
  size="large"
  
  rounded
/>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
                justifyContent: "center",
              }}
            >
              <Text size="md">¿No es tu cuenta?</Text>
              <TouchableOpacity
                onPress={() => {
                  const result_2 = delete_securitykey(secureemail);
    if(result_2){
      result_2.then((espera) => {setSecurityemail(espera);
      console.log('delete email' + securityEmail);
      });
    }
    const result_3 = delete_securitykey(securePassword);
    if(result_3){
      result_3.then((espera) => {setSecurityemail(espera);
      console.log('delete email' + securityEmail);
      });
    }
    setEmail('');
    setPassword('');
    setVisibleFingerprint("none");
                  change_views();
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                  }}
                >
                  Inicia sesión en otra cuenta
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
    container: {
      paddingTop: 50,
    },
    stretch: {
      alignSelf: "center",
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
