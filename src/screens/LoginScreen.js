import React, { memo, useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, Text, View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { emailValidator, passwordValidator } from "../core/untilities";
import { setUserData } from "../redux/actions";
import { loginUser } from '../core/auth-api';
import { connect } from 'react-redux';
import { theme } from "../core/theme";
import axios from 'axios';
import Logo from "../components/Logo";
import Toast from "../components/Toast";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import MapBackground from "../components/MapBackground";
import TheWhiteSquare from '../components/TheWhiteSquare';

const worker = false;

const LoginScreen = ({ region, navigation, dispatch }) => {
   const [animationData, setAnimationData] = useState({ height: 72, top: 13 });
   const [password, setPassword] = useState({ value: "", error: "" });
   const [email, setEmail] = useState({ value: "", error: "" });
   const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   const _onLoginPressed = async () => {
      if (loading) return;

      const emailError = emailValidator(email.value);
      const passwordError = passwordValidator(password.value);

      if (emailError || passwordError) {
         setEmail({ ...email, error: emailError });
         setPassword({ ...password, error: passwordError });
         return;
      };

      setLoading(true);

      const response = await loginUser({
         email: email.value,
         password: password.value
      });


      const databaseResponse = await axios.get('http://ritzcarservice.us-east-2.elasticbeanstalk.com/api/login', {
         params: { id: response.user.uid },
      });

      console.log('Login Firebase reponse: ', response.user);
      console.log('Login DB reponse: ', databaseResponse.data);

      dispatch(setUserData({
         uid: response.user.uid,
         displayName: response.user.displayName,
         email: response.user.email,
         phoneNumber: response.user.phoneNumber,
         photoURL: response.user.photoURL,
         ...databaseResponse.data
      }));

      setLoading(false);

      if (response.error) {
         setError(response.error);
         return
      };

      //implements new testing variable worker
      if (!worker) {
         navigation.navigate("Dashboard");
      };

      //redirects drivers to a different screen than customers
      if (worker) {
         navigation.navigate("DriverDash");
      };
   };

   useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
         setKeyboardIsOpen(true)
      });

      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
         setKeyboardIsOpen(false)
      });

      if (email.error || password.error) {
         if (keyboardIsOpen) {
            setAnimationData({ ...animationData, height: 68, top: 0 });
         } else {
            setAnimationData({ ...animationData, height: 74, top: 11 });
         };
      };

      if (email.error && password.error) {
         if (keyboardIsOpen) {
            setAnimationData({ ...animationData, height: 73, top: 0 });
         } else {
            setAnimationData({ ...animationData, height: 78, top: 9 });
         };
      };

      if (!email.error && !password.error) {
         if (keyboardIsOpen) {
            setAnimationData({ ...animationData, height: 64, top: 0 })
         } else {
            setAnimationData({ ...animationData, height: 72, top: 13 })
         };
      };
   }, [email.error, password.error, keyboardIsOpen]);

   return (
      <>
         <MapBackground region={region} />
         {/* <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}> */}
         <View>
            <BackButton goBack={() => navigation.navigate("HomeScreen")} />
            <View style={styles.wrapper}>
               <TheWhiteSquare height={73} top={13} animationData={animationData} duration={250}>
                  <Logo />

                  <Header>Welcome back!</Header>

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

                  <View style={styles.forgotPassword}>
                     <TouchableOpacity
                        onPress={() => navigation.navigate("ForgotPasswordScreen")}
                     >
                        <Text style={styles.label}>Forgot your password?</Text>
                     </TouchableOpacity>
                  </View>

                  <Button loading={loading} mode="contained" onPress={_onLoginPressed}>
                     Login
                     </Button>

                  <View style={styles.row}>
                     <Text style={styles.label}>Don’t have an account? </Text>
                     <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
                        <Text style={styles.link}>Sign up</Text>
                     </TouchableOpacity>
                  </View>
               </TheWhiteSquare>
            </View>
         </View>
         {/* </TouchableWithoutFeedback> */}

         <Toast
            type={'error'}
            message={error}
            onDismiss={() => setError("")}
         />
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
      alignItems: 'center',
   }
});

const mapStateToProps = ({ geoLocation }) => ({ region: geoLocation })

export default connect(mapStateToProps)(memo(LoginScreen));
