import React from "react";
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TheWhiteSquare from "../components/TheWhiteSquare";
import MapBackground from "../components/MapBackground";

const HomeScreen = ({ region, navigation }) => (
   <>
      <MapBackground region={region} />
      <View style={styles.container}>
         <TheWhiteSquare top={20} height={55}>
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

const mapStateToProps = ({ geoLocation }) => ({ region: geoLocation })

export default connect(mapStateToProps)(HomeScreen);
