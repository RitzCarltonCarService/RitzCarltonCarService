import React, { useState, memo } from "react";
import { updateGeoLocation, setUserData } from "../redux/actions";
import { ActivityIndicator } from "react-native";
import { FIREBASE_CONFIG } from "../core/config";
import { connect } from 'react-redux';
import { theme } from "../core/theme";
import * as Permissions from 'expo-permissions';
import LogoBackground from '../components/LogoBackground';
import * as Location from 'expo-location';
import firebase from "firebase/app";
import Toast from '../components/Toast';
import "firebase/auth";

// Initialize Firebase
firebase.initializeApp(FIREBASE_CONFIG);

const AuthLoadingScreen = ({ navigation, dispatch }) => {
   const [error, setError] = useState("");

   const getCurrentLocation = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status !== 'granted') {
         Alert.alert(
            'Please be Advised',
            'This app will not work without location services enabled.',
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );
         setError('Permission to access location was denied');
      };

      return await Location.getCurrentPositionAsync({});
   };

   firebase.auth().onAuthStateChanged(user => {
      // User is logged in
      if (user) {
         try {
            dispatch(setUserData({
               uid: user.uid,
               displayName: user.displayName,
               email: user.email,
               phoneNumber: user.phoneNumber,
               photoURL: user.photoURL,
            }));

            getCurrentLocation()
               .then((position) => {
                  dispatch(updateGeoLocation({
                     latitude: position.coords.latitude,
                     longitude: position.coords.longitude,
                     latitudeDelta: 0.003,
                     longitudeDelta: 0.003,
                  }));
                  navigation.navigate("Dashboard");
               });
         } catch (error) {
            setError(error);
         };
      };

      // User is not logged in
      if (!user) {
         navigation.navigate("HomeScreen");
      };
   });

   return (
      <LogoBackground>
         <ActivityIndicator size="large" color={theme.colors.primary} />
         <Toast
            type={'error'}
            message={error}
            onDismiss={() => setError("")}
         />
      </LogoBackground>
   );
};

export default connect()(memo(AuthLoadingScreen));
