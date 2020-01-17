import React from "react";
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TheWhiteSquare from "../components/TheWhiteSquare";
import MapBackground from "../components/MapBackground";

const HomeScreen = ({ navigation, region, fromLocation, toLocation }) => (
   <>
      <MapBackground region={region} fromLocation={fromLocation} toLocation={toLocation} />
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

<<<<<<< HEAD
const mapStatetoProps = (state) => {
   console.log("This is the state", state)
   return {
      region: state.geoLocation,
      fromLocation: state.fromLocation,
      toLocation: state.toLocation
   }
}

export default connect(mapStatetoProps)(HomeScreen);
=======
const mapStateToProps = ({ geoLocation }) => ({ region: geoLocation })

export default connect(mapStateToProps)(HomeScreen);
>>>>>>> 6f6f370feb4ae3bb63dca3ddea7df0063fdce588
