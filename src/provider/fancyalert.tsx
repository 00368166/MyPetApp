import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
} from "react-native";
import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";

import { StyleSheet } from "react-native";

import { Ionicons } from '@expo/vector-icons';


import { FancyAlert } from 'react-native-expo-fancy-alerts';

const [visible, setVisible] = React.useState(false);
  
const toggleAlert = React.useCallback(() => {
  setVisible(!
    visible);
    
}, [visible]);




const AppErrorModal = (props: object) => {
 // const [visible, setVisible] = React.useState(false);
  
  const toggleAlert = React.useCallback(() => {
    setVisible(!
      visible);
      
  }, [visible]);

  return <FancyAlert
  visible={props.visible}
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
        <Text style={styles.contentText}>nle</Text>
  
        <TouchableOpacity style={styles.btn} onPress={toggleAlert}>
          <Text style={styles.btnText}>OK</Text>
        </TouchableOpacity>
      </View>
    </FancyAlert>;
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
    backgroundColor: '#4CB748',
    marginTop: 16,
    minWidth: '50%',
    paddingHorizontal: 16,
  },
  btnText: {
    color: '#FFFFFF',
  },
});

export default AppErrorModal;
