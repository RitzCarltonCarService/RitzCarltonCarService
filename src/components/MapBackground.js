import React from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';

// remove PROVIDER_GOOGLE import if not using Google Maps
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { aubergineMapStyle, silverMapStyle } from '../core/mapStyles';

const MapBackground = ({ children }) => {
   let today = new Date();
   let hour = today.getHours();
   let mapColorizer;

   if (hour > 18 || hour < 6) {
      mapColorizer = aubergineMapStyle
   } else (
      mapColorizer = silverMapStyle
   );

   return (
      <MapView
         provider={PROVIDER_GOOGLE} // remove if not using Google Maps
         style={styles.map}
         region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
         }}
         customMapStyle={mapColorizer}
      >
         <KeyboardAvoidingView style={styles.container} behavior='padding'>
            {children}
         </KeyboardAvoidingView>
      </MapView>
   )
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 20,
      width: '100%',
      maxWidth: 340,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
   },
   map: {
      ...StyleSheet.absoluteFillObject,
   },
});

export default MapBackground;
