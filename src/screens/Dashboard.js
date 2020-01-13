import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { vh, vw } from 'react-native-viewport-units';
import MapBackground from '../components/MapBackground';
import PrePickupInfo from '../layouts/PickupInfo-SubComponents/PrePickupInfo';
import MainScreen from '../layouts/Home-SubComponents/MainScreen';
import NewPickup from '../layouts/Home-SubComponents/NewPickup';
import Toast from '../components/Toast';

const Home = ({ region, userData }) => {
   const [page, setPage] = useState("home");
   const [toast, setToast] = useState({ value: "", type: "" });

   useEffect(() => {
      if (userData.displayName) {
         setToast({
            type: "success",
            value: `Welcome, ${userData.displayName}`
         });
      };
   }, [userData.displayName])

   return (
      <>
         <MapBackground region={region} />

         <View style={styles.container}>
            {(() => {
               switch (page) {
                  case "new pickup":
                     return (
                        <NewPickup setPage={setPage} />
                     )
                  case "pickup info":
                     return (
                        <PrePickupInfo setPage={setPage} />
                     )
                  default:
                     return (
                        <MainScreen setPage={setPage} />
                     )
               }
            })()}
         </View>

         <Toast
            type={toast.type}
            message={toast.value}
            onDismiss={() => setToast({ value: "", type: "" })}
         />
      </>
   );
};

const styles = StyleSheet.create({
   container: {
      height: 100 * vh,
      width: 100 * vw,
      alignItems: "center"
   }
});

const mapStateToProps = ({ geoLocation, userData }) => ({
   region: geoLocation,
   userData,
});

export default connect(mapStateToProps)(Home);