import React from "react";
import MapBackground from "../components/MapBackground";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";

const HomeScreen = ({ navigation }) => (
   <>
      <MapBackground />
      <Logo />
      <Header>Ritz Carlton Resident Login</Header>

      <Paragraph>
         Welcome to the Ritz Carlton Resident Car Service! Please Login or Signup to continue
      </Paragraph>

      <Button mode="contained" onPress={() => navigation.navigate("Login")}>
         Login
      </Button>

      <Button mode="outlined" onPress={() => navigation.navigate("RegisterScreen")}>
         Sign Up
      </Button>
   </>
);

export default HomeScreen;
