import React, { useState, useEffect } from "react";
import "firebase/auth";
import firebase from "firebase/app";
import { connect } from 'react-redux';
import { FIREBASE_CONFIG } from "../core/config";
import { ActivityIndicator } from "react-native";
import { theme } from "../core/theme";
import { updateGeoLocation } from "../redux/actions";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

// Initialize Firebase
firebase.initializeApp(FIREBASE_CONFIG);

const AuthLoadingScreen = ({ navigation, dispatch }) => {

   // const getCurrentLocation = () =>  {
   //    return new Promise((resolve, reject) => {
   //       navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
   //    });
   // };

   const getCurrentLocation = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
         this.setState({
            errorMessage: 'Permission to access location was denied',
         });
      }

      return await Location.getCurrentPositionAsync({});
   }

   useEffect(() => {
     getCurrentLocation()
      .then((position) => {
         let coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
         }
         dispatch(updateGeoLocation(coords))
      })  
   },[]);

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
         <ActivityIndicator size="large" color={theme.colors.primary} />
      </>
   );
};

export default connect()(AuthLoadingScreen);