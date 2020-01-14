import React, { memo, useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { emailValidator, passwordValidator } from "../core/untilities";
import { loginUser } from '../core/auth-api';
import { theme } from "../core/theme";
import MapBackground from "../components/MapBackground";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import TheWhiteSquare from '../components/TheWhiteSquare';
import Toast from "../components/Toast";

const worker = false;

const LoginScreen = ({ navigation }) => {
   const [email, setEmail] = useState({ value: "", error: "" });
   const [password, setPassword] = useState({ value: "", error: "" });
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
      }

      setLoading(true);

      const response = await loginUser({
         email: email.value,
         password: password.value
      });

      if (response.error) {
         setError(response.error);
      }

      if (!response.error && !worker) { //implements new testing variable worker
         navigation.navigate("Dashboard");
      }
      //redirects drivers to a different screen than customers
      if (!response.error && worker) {
         navigation.navigate("DriverDash");
      }

      setLoading(false);
   };

   return (
      <>
         <MapBackground />
         <BackButton goBack={() => navigation.navigate("HomeScreen")} />
         <View style={styles.wrapper}>
            <TheWhiteSquare height={75} top={15}>
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

         <Toast message={error} onDismiss={() => setError("")} />
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

export default memo(LoginScreen);
