import React from "react";
import "firebase/auth";
import firebase from "firebase/app";
import { FIREBASE_CONFIG } from "../core/config";
import { ActivityIndicator } from "react-native";
import { theme } from "../core/theme";
import MapBackground from "../components/MapBackground";

// Initialize Firebase
firebase.initializeApp(FIREBASE_CONFIG);

const AuthLoadingScreen = ({ navigation }) => {
   firebase.auth().onAuthStateChanged(user => {
      if (user) {
         // User is logged in
         navigation.navigate("Dashboard");
      } else {
         // User is not logged in
         navigation.navigate("HomeScreen");
      }
   });

   return (
      <>
         <MapBackground />
         <ActivityIndicator size="large" color={theme.colors.primary} />
      </>
   );
};

export default AuthLoadingScreen;
