import { StatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "react-native-rapi-ui";
import Navigation from "./src/navigation";
import { AuthProvider } from "./src/provider/AuthProvider";
import { UserContextProvider, useUser } from './src/UserContext'

export default function App() {
  const images = [
    require("./assets/images/login.jpg"),
    require("./assets/images/register.jpg"),
    //require("./assets/images/forget.jpg"),
  ];
  return (
    <ThemeProvider images={images}>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
      <StatusBar />
    </ThemeProvider>
  );
}
