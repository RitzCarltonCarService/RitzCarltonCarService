import React, { memo, useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import MapBackground from "../components/MapBackground";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import TheWhiteSquare from '../components/TheWhiteSquare';
import { theme } from "../core/theme";
import { emailValidator, passwordValidator } from "../core/untilities";
import Toast from "../components/Toast";
import firebase from 'firebase';

const DriverDash = ({ navigation }) => {
   const [date, setDate] = useState(new Date());
   useEffect(() => {
    var timer = setInterval( () => tick(), 1000 );
 
    return function cleanup() {
      clearInterval(timer);
    };
   });
   
   function tick() {
    setDate(new Date());
   }
   return (
      <>
         <MapBackground />
         {/* in place of the go back button will use a hamburger and drawer */}
         {/* we will also set state to worker is false (logout) */}
         <BackButton goBack={() => navigation.navigate("HomeScreen")} />
         <View style={styles.wrapper}>
            <TheWhiteSquare height={75} top={15}>
               <Logo />

               <Header>Status: Clocked Out</Header>
               <Header>{date.toLocaleTimeString()}</Header>

               {/* onPress={_onLoginPressed} */}
               <Button mode="contained" >
                  Submit
               </Button>
            </TheWhiteSquare>
         </View>

         {/* <Toast message={error} onDismiss={() => setError("")} /> */}
      </>
   );
};

const styles = StyleSheet.create({
   forgotPassword: {
      width: "100%",
      alignItems: "flex-end",
      marginBottom: 24
   },
   row: {
      flexDirection: "row",
      marginTop: 4
   },
   label: {
      color: theme.colors.secondary
   },
   link: {
      fontWeight: "bold",
      color: theme.colors.primary
   },
   wrapper: {
      alignItems: 'center'
   }
});

export default memo(DriverDash);
