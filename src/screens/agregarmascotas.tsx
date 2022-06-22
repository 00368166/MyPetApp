import React, { useState,Component } from "react";
import Checkbox from 'expo-checkbox';
import DatePicker from 'react-native-datepicker';
import {
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { View } from "react-native";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
  TextInput,
  Datepicker,
  Button,
} from "react-native-rapi-ui";
import {
    Avatar,
    Section,
    SectionContent,
  } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

export default function ({
  navigation,route,
}: NativeStackScreenProps<MainStackParamList, "SecondScreen">) {
  type Todo = {
    id: number;
    user_id: string;
    nombrea: string;
    tipoa: string;
    cumplea: Date;
    descripa: string;
    esteria: boolean;
    saluda: string;
  };
  const { isDarkmode, setTheme } = useTheme();
  const [nombre, setNombre] = useState<string>("");
  const [tipo, setTipo] = useState<string>("");
  const [cumple, setCumple] = useState(new Date());
  
  const [descrip, setDescrip] = useState<string>("");
  const [esterilizado, setEsterilizado] = useState<boolean>(false);
  
  const [direccion, setDireccion] = useState<string>("");
  
  const [salud, setSalud] = useState<string>("");
  
  const [loading, setLoading] = useState<boolean>(false);
  const currentDay = new Date();

  const [todos, setTodos] = useState<Array<Todo>>([]);
  
  const addTodo = async () => {
      const { data: todo, error } = await supabase
        .from<Todo>("dogos")
        .insert({ user_id: user!.id,nombrea:nombre,tipoa:tipo,cumplea:cumple,descripa:descrip,esteria:esterilizado,saluda:salud})
        .single();
      if (error) console.log(error.message);
      else {
        setTodos([todo!, ...todos]);
      }
  };


  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
    <Layout>
    <TopNav
        middleContent="Agregar mascota"
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        leftAction={() => navigation.goBack()}
        
      />
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
          <Text
            fontWeight="bold"
            style={{
              alignSelf: "center",
            }}
            size="h2"
          >
            ¡Hola!
          </Text>

          <Text
            fontWeight="bold"
            style={{
              alignSelf: "center",
            }}
            size="h4"
          >
            Vamos a agregar una nueva mascota
          </Text>
          
        </View>
        <View
          style={{
            flex: 3,
            paddingHorizontal: 20,
            paddingBottom: 20,
            backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
          }}
        >
          
          <Text style={{ padding: 15 }}>Imagen</Text>
          <View style={{flexDirection: "row",
    margin: 10}}>
<Image
            //resizeMode="center"
            style={{
              height: 180,
              width: '50%',
            }}
            source={require("../../assets/images/login.jpg")}
          />
<Text style={{ padding: 15 }}>Selecciona una imagen de tu galeria
</Text>
          </View>
          

          <Text style={{ marginTop: 15 }}>Nombre</Text>
          <TextInput
            containerStyle={{ marginTop: 15 }}
            placeholder="Ingresa el nombre"
            value={nombre}
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            secureTextEntry={false}
            onChangeText={(text) => setNombre()}
          />
          <Text>Tipo de mascota:</Text>
          <TextInput
            containerStyle={{ marginTop: 15 }}
            placeholder="Ingresa el nombre"
            value={tipo}
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            secureTextEntry={false}
            onChangeText={(text) => setTipo()}
          />
          <Text>Cumpleaños:</Text>
          <DatePicker
        style={{width: 200}}
        date={cumple}
        mode="date"
        placeholder="select date"
        format="YYYY-DD-MM"
        minDate="2016-05-01"
        maxDate={currentDay}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => setCumple(date)}
      />
      
      <Text>Descripcion de la mascota:</Text>
          <TextInput
            containerStyle={{ marginTop: 15 }}
            placeholder="Describe tu mascota"
            value={descrip}
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            secureTextEntry={false}
            onChangeText={(text) => setDescrip()}
          />
      <Text>Estado de salud</Text>
          <TextInput
            containerStyle={{ marginTop: 15 }}
            placeholder="Describe tu mascota"
            value={salud}
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            secureTextEntry={false}
            onChangeText={(text) => setSalud()}
          />

<View style={{flexDirection: "row",
    margin: 10}}>
  
<Text>Esterilizado:</Text>
        <Checkbox
          value={esterilizado}
          onValueChange={setEsterilizado}
          color={esterilizado ? '#4630EB' : undefined}
        />
      </View>
      
          <Button
            text={loading ? "Registrado" : "Registrar"}
            onPress={() => {
              addTodo();
            }}
            style={{
              marginTop: 20,
              height: 50,
              margin: "30%",
            }}
            status="info"
            disabled={loading}
          />


        </View>
        
      </ScrollView>
    </Layout>
  </KeyboardAvoidingView>
  );
}
