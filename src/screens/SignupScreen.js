import React, { memo, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Keyboard } from "react-native";
import { emailValidator, passwordValidator, nameValidator } from "../core/untilities";
import { setUserData } from "../redux/actions";
import { signUpUser } from '../core/auth-api';
import { connect } from 'react-redux';
import { theme } from "../core/theme";
import Logo from "../components/Logo";
import Toast from "../components/Toast";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import MapBackground from "../components/MapBackground";
import TheWhiteSquare from '../components/TheWhiteSquare';
import axios from 'axios';

const RegisterScreen = ({ region, navigation, dispatch }) => {
   const [animationData, setAnimationData] = useState({ height: 78, top: 10, fontSize: 26 });
   const [password, setPassword] = useState({ value: "", error: "" });
   const [email, setEmail] = useState({ value: "", error: "" });
   const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
   const [name, setName] = useState({ value: "", error: "" });
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   const _onSignUpPressed = async () => {
      if (loading) return;

      const nameError = nameValidator(name.value);
      const emailError = emailValidator(email.value);
      const passwordError = passwordValidator(password.value);

      if (emailError || passwordError || nameError) {
         setName({ ...name, error: nameError });
         setEmail({ ...email, error: emailError });
         setPassword({ ...password, error: passwordError });
         return;
      };

      setLoading(true);

      const response = await signUpUser({
         name: name.value,
         email: email.value,
         password: password.value
      });

      let test = {
         id: response.user.uid,
         email: response.user.email,
         name: name.value,
         hotelId: 1,
         type: 'resident',
         phoneNumber: response.user.phoneNumber,
      };
      
      if (!response.error) {
         await axios.post('http://ritzcarservice.us-east-2.elasticbeanstalk.com/api/signup', test);
   
         dispatch(setUserData({
            uid: response.user.uid,
            displayName: name.value,
            email: response.user.email,
            phoneNumber: response.user.phoneNumber,
            photoURL: response.user.photoURL,
            hotelId: 1,
            type: 'resident',
         }));
      }

      setLoading(false);

      if (response.error) {
         setError(response.error);
         return
      };

      navigation.navigate("Dashboard");
   };

   useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
         setKeyboardIsOpen(true);
      });

      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
         setKeyboardIsOpen(false);
      });

      if (!email.error && !password.error && !name.error) {
         if (keyboardIsOpen) {
            setAnimationData({ ...animationData, height: 64, top: 0, fontSize: 0 });
            return
         } else {
            setAnimationData({ ...animationData, height: 78, top: 10, fontSize: 26 });
            return
         };
      };
      if (email.error || password.error || name.error) {
         if (keyboardIsOpen) {
            setAnimationData({ ...animationData, height: 66, top: 0, fontSize: 0 });
            return
         } else {
            setAnimationData({ ...animationData, height: 82, top: 7, fontSize: 26 });
            return
         };
      };
      if (email.error && password.error && name.error) {
         if (keyboardIsOpen) {
            setAnimationData({ ...animationData, height: 70, top: 0, fontSize: 0 });
            return
         } else {
            setAnimationData({ ...animationData, height: 88, top: 5, fontSize: 26 });
            return
         };
      };

   }, [email.error, password.error, name.error, keyboardIsOpen])

   return (
      <>
         <MapBackground region={region} />
         <View style={styles.wrapper}>
            <TheWhiteSquare height={78} top={10} animationData={animationData} duration={250}>
               <Logo />

               <Header animationData={animationData} >Create Account</Header>

               <TextInput
                  label="Name"
                  returnKeyType="next"
                  value={name.value}
                  onChangeText={text => setName({ value: text, error: "" })}
                  error={!!name.error}
                  errorText={name.error}
               />

               <TextInput
                  label="Email"
                  returnKeyType="next"
                  value={email.value}
                  onChangeText={text => setEmail({ value: text, error: "" })}
                  error={!!email.error}
                  errorText={email.error}
                  autoCapitalize="none"
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
               />

               <TextInput
                  label="Password"
                  returnKeyType="done"
                  value={password.value}
                  onChangeText={text => setPassword({ value: text, error: "" })}
                  error={!!password.error}
                  errorText={password.error}
                  secureTextEntry
                  autoCapitalize="none"
               />

               <Button
                  loading={loading}
                  mode="contained"
                  onPress={_onSignUpPressed}
                  style={styles.button}
               >
                  Sign Up
               </Button>

               <View style={styles.row}>
                  <Text style={styles.label}>Already have an account? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                     <Text style={styles.link}>Login</Text>
                  </TouchableOpacity>
               </View>
            </TheWhiteSquare>
         </View>

         <Toast
            type={'error'}
            message={error}
            onDismiss={() => setError("")}
         />
         
         <BackButton goBack={() => navigation.navigate("HomeScreen")} />
      </>
   );
};

const styles = StyleSheet.create({
   label: {
      color: theme.colors.secondary
   },
   button: {
      marginTop: 24
   },
   row: {
      flexDirection: "row",
      marginTop: 4
   },
   link: {
      fontWeight: "bold",
      color: theme.colors.primary
   },
   wrapper: {
      alignItems: 'center'
   }
});

const mapStateToProps = ({ geoLocation }) => ({ region: geoLocation })

export default connect(mapStateToProps)(memo(RegisterScreen));
