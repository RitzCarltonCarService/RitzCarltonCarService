import React, { memo, useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, Text, View, Picker } from "react-native";
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
import ModalDropdown from 'react-native-modal-dropdown';
import firebase from 'firebase';

const DriverDash = ({ navigation }) => {
   const [date, setDate] = useState(new Date());
   const [punch, setPunch] = useState({ val: "Clocked Out" });
   const [dropdownVal, setdropdownVal] = useState({ ddv: "xxx" });

   const dropdownOptions = [
     'CLOCK IN',
     'CLOCK OUT',
     'START BREAK',
     'END BREAK',
     'START MEAL',
     'END MEAL',
    ]

   useEffect(() => {
    var timer = setInterval( () => tick(), 1000 );
 
    return function cleanup() {
      clearInterval(timer);
    };
   });
   
   function tick() {
    setDate(new Date());
   }

   function statusUpdate() {
    switch (dropdownVal.ddv) {
      case '1':
        punch.val = "Clocked Out";
        break;
      case '2':
        punch.val = "On Break";
        break;
      case '4':
        punch.val = "On Meal Time";
        break;
      default:
        punch.val = "Clocked In";
    }
    // const d = dropdownVal.ddv;
    // if (d == 1) {
    //   punch.val = "Clocked Out";
    // } else if (d == 2) {
    //   punch.val = "On Break";
    // } else if (d == 4) {
    //   punch.val = "On Meal Time";
    // } else {
    //   punch.val = "Clocked In";
    // }
    //punch.val = dropdownOptions[dropdownVal.ddv];
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

               <Header>Status: { punch.val }</Header>
               <Header>{date.toLocaleTimeString()}</Header>
               <ModalDropdown 
                defaultValue={ punch.val === 'Clocked In' ? 'CLOCK OUT' : 'CLOCK IN' }
                options={dropdownOptions}
                style={styles.picker}
                textStyle={styles.picker_text}
                dropdownStyle={styles.picker_dropdown}
                onSelect={(value) => dropdownVal.ddv = value}
               />

               {/* onPress={_onLoginPressed} */}
               <Button mode="contained" onPress={statusUpdate}>
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
   },
   picker: {
    width: 200,
    borderWidth: 0,
    borderRadius: 3,
    backgroundColor: 'black',
  },
  picker_text: {
    fontFamily: Platform.OS === 'ios' ? "Arial" : "Roboto",
    letterSpacing: 2,
    fontWeight: "bold",
    fontSize: 17,
    lineHeight: 26,
    color: theme.colors.secondary,
    marginVertical: 10,
    marginHorizontal: 6,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  picker_dropdown: {
    width: 200,
    height: 200,
    fontWeight: "bold",
    borderColor: 'darkgrey',
    borderWidth: 2,
    borderRadius: 3,
    backgroundColor: 'lightgrey',
  },
});

export default memo(DriverDash);
