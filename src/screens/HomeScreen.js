import React from "react";
import { View, StyleSheet } from 'react-native';
import MapBackground from "../components/MapBackground";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";

const HomeScreen = ({ navigation }) => (
   <>
      <MapBackground />
      <View style={styles.wrapper}>
         <Logo />
         <Header>The Ritz Carlton Residences</Header>

         <Button mode="contained" onPress={() => navigation.navigate("LoginScreen")}>
            Login
         </Button>

         <Button mode="outlined" onPress={() => navigation.navigate("RegisterScreen")}>
            Sign Up
         </Button>
      </View>
   </>
);

const styles = StyleSheet.create({
   wrapper: {
      flex: 1,
      width: "100%",
      maxWidth: 340,
      maxHeight: 500,
      marginTop: 80,
      padding: 20,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: '#fff',
   },
});

export default HomeScreen;
