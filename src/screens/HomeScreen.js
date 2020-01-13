import React from "react";
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import MapBackground from "../components/MapBackground";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TheWhiteSquare from "../components/TheWhiteSquare";

const HomeScreen = ({ navigation, region }) => (
   <>
      <MapBackground region={region} />
      <View style={styles.container}>
         <TheWhiteSquare top={20}>
            <Logo />
            <Header>The Ritz Carlton Residences</Header>

            <Button mode="contained" onPress={() => navigation.navigate("LoginScreen")}>
               Login
            </Button>

            <Button mode="outlined" onPress={() => navigation.navigate("SignupScreen")}>
               Sign Up
            </Button>
         </TheWhiteSquare>
      </View>
   </>
);

const styles = StyleSheet.create({
   container: {
      alignItems: "center",
   }
});

const mapStatetoProps = ({ geoLocation }) => ({ region: geoLocation });

export default connect(mapStatetoProps)(HomeScreen);
