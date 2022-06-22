import React, { useEffect, useState } from 'react'
import { ScrollView,View,Image,FlatList } from "react-native";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Layout, Section, SectionContent, Text } from "react-native-rapi-ui";
//import { supabase } from "../initSupabase";

import { supabase } from "../initSupabase";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

import { Button, Input, ListItem, CheckBox } from 'react-native-elements'


//import { supabase } from "../../initSupabase";

import { TouchableOpacity, StyleSheet } from 'react-native';
import 'react-native-url-polyfill/auto';

import { useUser } from '../provider/AuthProvider'

type Todo = {
  id: number
  user_id: string
  nombre: string
  tipo: string
  cumple: Date
  tipo: string
  esteri: boolean
}

export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
  const { user } = useUser()
  const [todos, setTodos] = useState<Array<Todo>>([])
  const [newTaskText, setNewTaskText] = useState<string>('')

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const { data: todos, error } = await supabase
      .from<Todo>('dogos')
      .select('*')
      .order('id', { ascending: false })
    if (error) console.log('error', error)
    else setTodos(todos!)
  }

  const addTodo = async (taskText: string) => {
    const task = taskText.trim()
    console.log('newtask:', task)
    if (task.length) {
      const { data: todo, error } = await supabase
        .from<Todo>('todos')
        .insert({ task, user_id: user!.id })
        .single()
      if (error) console.log(error.message)
      else {
        setTodos([todo!, ...todos])
        setNewTaskText('')
      }
    }
  }

  const toggleCompleted = async (id: number, is_complete: boolean) => {
    const { data, error } = await supabase
      .from<Todo>('todos')
      .update({ is_complete: !is_complete })
      .eq('id', id)
      .single()
    if (error) console.log(error)
    else setTodos(todos.map((todo) => (todo.id === id ? data! : todo)))
  }

  const deleteTodo = async (id: number) => {
    const { error } = await supabase.from<Todo>('todos').delete().eq('id', id)
    if (error) console.log('error', error)
    else setTodos(todos.filter((x) => x.id !== Number(id)))
  }

  return (
    <Layout>
        <Section>
        <View style={styles.container}>
      
        <Text size="md" fontWeight="bold" size="h1" style={styles.titulo}>
                  Mis mascotas
                </Text>
                
       </View>
       
        </Section>
     <Section>
      
       <View style={styles.row}>

       <FlatList
          scrollEnabled={true}
          data={todos}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item: todo }) => (
            <ListItem bottomDivider>
              <ListItem.Content>
                <View
                  style={[
                    { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
                  ]}
                >
                  <CheckBox
                    checked={todo.is_complete}
                    onPress={() => toggleCompleted(todo.id, todo.is_complete)}
                  />
                  <Text h3 style={{ margin: 'auto' }}>
                    {todo.nombre}
                  </Text>
                  <Button title="Delete" onPress={() => deleteTodo(todo.id)}></Button>
                </View>
              </ListItem.Content>
            </ListItem>
          )}
        />
      </View>
      
     </Section>
    </Layout>
  );
}
