import * as Permissions from 'expo-permissions';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Notifications } from 'expo';
import { setUserData } from '../redux/actions';
import { connect } from 'react-redux';
import { units } from '../core/untilities';
import axios from 'axios';
import Bread from '../components/Bread';
import Toast from '../components/Toast';
import NewPickup from '../layouts/Home-SubComponents/NewPickup';
import MenuButton from '../components/MenuButton';
import MainScreen from '../layouts/Home-SubComponents/MainScreen';
import MapBackground from '../components/MapBackground';
import PrePickupInfo from '../layouts/PickupInfo-SubComponents/PrePickupInfo';

const Home = ({ region, userData, navigation, fromLocation, toLocation }) => {
   const [page, setPage] = useState("home");
   // Boolean to indicate whether this is a scheduled ride or an immediate request
   const [scheduled, setScheduled] = useState(true);
   // RideShare hook to produce pop-up when passenger selects ride share in Summary Screen
   const [rideShare, setRideShare] = useState(false);
   const [toast, setToast] = useState({ value: "", type: "" });
   const [visible, setVisibility] = useState(false);
   // userToken hook to store user token for push notifications
   const [userToken, setUserToken] = useState('');

   // Using useEffect as a ComponentDidMount method to request Permission of the user to send push notifications
   useEffect(() => {
      registerForPushNotificationsAsync = async(userID) => {
         const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
         // only asks if permissions have not already been determined, because
         // iOS won't necessarily prompt the user a second time.
         // On Android, permissions are granted on app installation, so
         // `askAsync` will never prompt the user
         
         // Stop here if the user did not grant permissions
         if (status !== 'granted') {
            alert('No notification permissions!');
            return;
         }

         try {
            // Get the token that identifies this device
            let token = await Notifications.getExpoPushTokenAsync();
            setUserToken(token);
            
            // POST the token to your backend server from where you can retrieve it to send push notifications.
            axios.post('http://ritzcarservice.us-east-2.elasticbeanstalk.com/api/addToken', {
               userID: userID,
               token: token
             })
             .then((response) => {
               console.log("This is the user data:", userData.pickups);
             })
             .catch((error) => {
               console.log(error);
             });         
         }
         catch(error) {
            console.log("This is the error: ", error)
         }
      }

      registerForPushNotificationsAsync(userData.uid);
   }, []);
   
   useEffect(() => {
      if (userData.displayName) {
         setToast({
            type: "success",
            value: `Welcome, ${userData.displayName}`
         });
      };
   }, [userData.displayName]);

   if (rideShare) {
      setRideShare(false);
      Alert.alert(
         'New Ride Share Request Submitted - Driver Notified!',
         'You will receive a notification of time of departure and estimated time of arrival shortly.',
         [
            {text: 'OK', onPress: () => {
               // here we can send notification after updating on the back-end this ride share
               console.log("Ok pressed!");
               setRideShare(false);
            }},
            {text: 'Cancel', onPress: () => {
               // here we can send notification after updating on the back-end this ride share
               setPage('new pickup');
               setRideShare(false);
            }},
         ],
         {cancelable: false},
     );
   }

   return (
      <>
         <MapBackground region={region} fromLocation={fromLocation} toLocation={toLocation} />
         <View style={styles.container}>
            {(() => {
               switch (page) {
                  case "new pickup":
                     return (
                        <NewPickup 
                           setPage={setPage} 
                           setRideShare={setRideShare} 
                           rideShare={rideShare} 
                           scheduled={scheduled} 
                           userToken={userToken}
                        />
                     )
                  case "pickup info":
                     return (
                        <PrePickupInfo setPage={setPage} />
                     )
                  default:
                     return (
                        <MainScreen setPage={setPage} setScheduled={setScheduled} />
                     )
               }
            })()}
         </View>

         <Bread
            visible={visible}
            navigation={navigation}
            setPage={setPage}
            userData={userData}
            setUserData={setUserData}
            headerOne={`Request Pick-up`}
            headerTwo={`Ride History`}
            onDismiss={() => setVisibility(false)}
         />

         <Toast
            type={toast.type}
            message={toast.value}
            onDismiss={() => setToast({ value: "", type: "" })}
         />
         <MenuButton onPress={() => setVisibility(true)} setVisibility={setVisibility} />
      </>
   );
};

const styles = StyleSheet.create({
   container: {
      height: 100 * units.vh,
      width: 100 * units.vw,
      alignItems: "center"
   }
});

const mapStateToProps = ({ geoLocation, userData, fromLocation, toLocation }) => {
   return {
      region: geoLocation,
      userData: userData,
      fromLocation: fromLocation,
      toLocation: toLocation
   }
};

const mapDispatchToProps = {
   setUserData: setUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);