import React from "react";
import { connect } from 'react-redux';
import { Text } from 'react-native';
import MapBackground from "../components/MapBackground";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";

const HomeScreen = ({ isLoggedIn, navigation, dispatch }) => (
   <MapBackground>
      <Logo />
      <Header>Ritz Carlton Resident Login</Header>

      <Paragraph>
         Welcome to the Ritz Carlton Resident Car Service! Please Login or Signup to continue
      </Paragraph>

      <Button mode="contained" onPress={() => navigation.navigate("Login")}>
         Login
      </Button>

      <Button mode="outlined" onPress={() => /*navigation.navigate("RegisterScreen")*/dispatch({ type: 'LOG_IN' })}>
         Sign Up
      </Button>
      <Text>{`${isLoggedIn}`}</Text>
   </MapBackground>
);

const mapStateToProsp = ({ isLoggedIn }) => ({
   isLoggedIn,
});

export default connect(mapStateToProsp)(HomeScreen);
