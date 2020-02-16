import React, { useState, memo } from "react";
import { updateGeoLocation, setUserData } from "../redux/actions";
import { ActivityIndicator } from "react-native";
import { FIREBASE_CONFIG } from "../core/config";
import { connect } from 'react-redux';
import { theme } from "../core/theme";
import LogoBackground from '../components/LogoBackground';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import firebase from "firebase/app";
import Toast from '../components/Toast';
import "firebase/auth";
import axios from 'axios';

// Initialize Firebase
firebase.initializeApp(FIREBASE_CONFIG);

const AuthLoadingScreen = ({ navigation, dispatch }) => {
   const [error, setError] = useState("");

   // Export 'getCurretnLocation' to be used on the driver's side as well!
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
         // console.log('Firebase user object:', user)
         try {
            axios.get('http://ritzcarservice.us-east-2.elasticbeanstalk.com/api/login', {
               params: { id: user.uid },
            })
               .then((result) => {
                  // console.log('Database result data:', result.data);
                  dispatch(setUserData({
                     uid: user.uid,
                     displayName: user.displayName,
                     email: user.email,
                     phoneNumber: user.phoneNumber,
                     photoURL: user.photoURL,
                     userType: user.type,
                     ...result.data
                  }));

                  getCurrentLocation()
                     .then((position) => {
                        dispatch(updateGeoLocation({
                           latitude: position.coords.latitude,
                           longitude: position.coords.longitude,
                           latitudeDelta: 0.003,
                           longitudeDelta: 0.003,
                        }));
                        
                        //implements new testing variable worker
                        if (result.data.type === "resident") {
                           navigation.navigate("Dashboard");
                        };

                        //redirects drivers to a different screen than customers
                        if (result.data.type === "driver") {
                           navigation.navigate("DriverDash");
                        };
                     });
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

const mapStateToProps = state => {
   return {
      latitude: state.latitude,
      longitude: state.longitude,

   }
}

export default connect()(memo(AuthLoadingScreen));
