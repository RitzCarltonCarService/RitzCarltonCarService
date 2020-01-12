import React, { useState, useEffect, memo } from "react";
import "firebase/auth";
import firebase from "firebase/app";
import { connect } from 'react-redux';
import { FIREBASE_CONFIG } from "../core/config";
import { ActivityIndicator } from "react-native";
import { theme } from "../core/theme";
import { updateGeoLocation, setUserData } from "../redux/actions";
import Toast from '../components/Toast';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

// Initialize Firebase
firebase.initializeApp(FIREBASE_CONFIG);

const AuthLoadingScreen = ({ navigation, dispatch }) => {
   const [error, setError] = useState("");

   const getCurrentLocation = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status !== 'granted') {
         setError('Permission to access location was denied');
      };

      return await Location.getCurrentPositionAsync({});
   }

   useEffect(() => {
      getCurrentLocation()
         .then((position) => {
            dispatch(updateGeoLocation({
               latitude: position.coords.latitude,
               longitude: position.coords.longitude,
               latitudeDelta: 0.003,
               longitudeDelta: 0.003,
            }));
         });
   }, []);

   firebase.auth().onAuthStateChanged(user => {
      console.log(user)
      // User is logged in
      if (user) {
         dispatch(setUserData({
            //jmCk1SOieDfSWd3yiWkqqWOj7eQ2
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
         }));
         navigation.navigate("Dashboard");
      };

      // User is not logged in
      if (!user) {
         navigation.navigate("HomeScreen");
      };
   });

   return (
      <>
         <ActivityIndicator size="large" color={theme.colors.primary} />
         <Toast message={error} onDismiss={() => setError("")} />
      </>
   );
};

export default connect()(memo(AuthLoadingScreen));