import React, { useEffect, useState } from "react";
import { ScrollView, View, Image, FlatList } from "react-native";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Layout, Section, SectionContent, Text } from "react-native-rapi-ui";
//import { supabase } from "../initSupabase";
import {
  TopNav,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";

import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../lib/initSupabase";
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from "react-native-cards";
import { RefreshControl, SafeAreaView } from 'react-native';

import { Button, Input, ListItem, CheckBox } from "react-native-elements";

//import { supabase } from "../../initSupabase";

import { TouchableOpacity, StyleSheet } from "react-native";
import "react-native-url-polyfill/auto";

import { useUser } from "../provider/AuthProvider";

type Todo = {
  id: number;
  user_id: string;
  nombre: string;
  tipo: string;
  cumple: Date;
  descrip: string;
  esteri: boolean;
};

export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
  const { user } = useUser();
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [newTaskText, setNewTaskText] = useState<string>("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const [refreshing, setRefreshing] = useState(true);
  const [userData, setUserData] = useState([]);

  const fetchTodos = async () => {
    const { data: todos, error } = await supabase
      .from<Todo>("dogos")
      .select("id,user_id,nombre,tipo,cumple,descrip,esterilizado")
      .order("id", { ascending: false });
    if (error) console.log("error", error);
    else setTodos(todos!);
    
    setRefreshing(false);
  };

  const addTodo = async (taskText: string) => {
    const task = taskText.trim();
    console.log("newtask:", task);
    if (task.length) {
      const { data: todo, error } = await supabase
        .from<Todo>("todos")
        .insert({ task, user_id: user!.id })
        .single();
      if (error) console.log(error.message);
      else {
        setTodos([todo!, ...todos]);
        setNewTaskText("");
      }
    }
  };

  const toggleCompleted = async (id: number, is_complete: boolean) => {
    const { data, error } = await supabase
      .from<Todo>("todos")
      .update({ is_complete: !is_complete })
      .eq("id", id)
      .single();
    if (error) console.log(error);
    else setTodos(todos.map((todo) => (todo.id === id ? data! : todo)));
  };

  const deleteTodo = async (id: number) => {
    const { error } = await supabase.from<Todo>("todos").delete().eq("id", id);
    if (error) console.log("error", error);
    else setTodos(todos.filter((x) => x.id !== Number(id)));
  };

  return (
    <Layout>
      <TopNav
        middleContent=
        {
          <Text size="md" fontWeight="bold" size="h2" style={styles.upcontent}>
          Mis mascotas
        </Text>
        }
        
        rightContent={
          <Ionicons
            name="add"
            size={20}
            style={styles.upcontent}
            //color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        rightAction={() => navigation.navigate('agregarmascotas')}
      />
      <ScrollView refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={fetchTodos} />
            }>
        <Section>
          <View style={styles.container}>
            <Text size="md" fontWeight="light" size="h3" style={styles.titulo}>
              Aqui apareceran tus mascotas en cuanto las registres :)
            </Text>
          </View>
        </Section>
      </ScrollView>
      <Section>
        <View style={styles.row}>
          <FlatList
            scrollEnabled={true}
            data={todos}
            keyExtractor={(item) => `${item.id}`}
            
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={fetchTodos} />
            }
            renderItem={({ item: todo }) => (
              <ListItem bottomDivider>
                <ListItem.Content>
                  <Card style={styles.Card}>
                    <CardImage
                      source={{ uri: "https://placekitten.com/g/350/150" }}
                      title={
                        <Text
                          fontWeight="medium"
                          size="h2"
                          style={styles.mascotaname}
                        >
                          {todo.nombre}
                        </Text>
                      }
                      style={styles.CardImage}
                    />
                    <CardTitle
                      title={
                        <Text
                          fontWeight="medium"
                          size="h3"
                          style={styles.mascotastext}
                        >
                          {todo.tipo}
                        </Text>
                      }
                      style={styles.CardTitle}
                    />
                    <CardContent
                      text={
                        <Text
                          fontWeight="medium"
                          size="h4"
                          style={styles.mascotastext}
                        >
                          {todo.descrip}
                        </Text>
                      }
                    />
                    <CardAction separator={true} inColumn={false}>
                      <CardButton
                        onPress={() =>
                          navigation.navigate("infomascota", {
                            paramKey: todo,
                          })
                        }
                        title="Editar información"
                        color="#B66D0D"
                        style={styles.CardButton}
                      />
                    </CardAction>
                  </Card>
                </ListItem.Content>
              </ListItem>
            )}
          />
        </View>
      </Section>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 15,
    backgroundColor: "#ecf0f1",
  },
  row: {
    flexDirection: "column",
    margin: 10,
  },
  upcontent:{
padding: 1,
color: "#49392C"
  },
  widget: {
    flex: 2,
    margin: 10,
    padding: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    borderRadius: 50,
    width: 250,
    height: 120,
  },
  avatar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  principal: {
    flex: 2
  },
  titulo: {
    marginLeft: 5,
    paddingBottom: 25,
    color: "#49392C",
  },
  CardImage: {
    borderBottomLeftRadius: 50000,
  },
  Card: {
    backgroundColor: "#ffff",
    borderRadius: 5,
  },
  CardTitle: {},
  CardButton: {},
  mascotastext: {
    color: "#49392C",
  },
  mascotaname: {
    color: "#EFF2F1",
  },
  perro: {},
});
