/*
 * The mapBackground is a background made using react-native-maps mapView
 * react-native-maps mapView docs: https://github.com/react-native-community/react-native-maps/blob/HEAD/docs/mapview.md
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Params ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * @style - TYPE: Object, DESC: Allows you to add more styling to the MapView tag on top of the default ones
 * @region - TYPE: Object, DESC: The region to be displayed by the map. The region is defined by the center coordinates
 *           and the span of coordinates to display.
 * @scrollEnabled - TYPE: Boolean, DEFAULT VALUE: true, DESC: If false the user won't be able to change the map region being displayed.
 * @props - TYPE: Varied, DESC: Any other react-native-maps MapView props,
 *          please see the react-native-maps mapView docs for a full list of the other availible props
 */

// When user selects a from and a two location, pass both to Redux Store
//  in MapBackground, create conditional rendering based on coordinates in Redux store (ensure
//  there are coordinates, and not blank strings)

// In Map Background, import MapViewDirections and conditionally render when
//  there is both a From and a To Location in redux store
import React, { memo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { aubergineMapStyle, silverMapStyle } from '../core/mapStyles';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { vh, vw } from 'react-native-viewport-units';

const MapBackground = ({ style, region, scrollEnabled, fromLocation, toLocation, ...props }) => {
   const ASPECT_RATIO = vw / vh;
   let hour = new Date().getHours();
   let origin = {};
   let destination = {};
   const GOOGLE_MAPS_APIKEY = '';
   const refContainer = useRef(null);

   if (region) {
      console.log("This is user's current location: ", region)
   }

   if (fromLocation) {
      console.log("These is the new from Location: ", fromLocation)
      if (region.latitude !== fromLocation.lat && region.longitude !== fromLocation.lng) {
         origin['latitude'] = fromLocation.lat;
         origin['longitude'] = fromLocation.lng;
      }
      console.log("This is our origin: ", origin)
   }

   if (toLocation) {
      console.log("These is the new to Location: ", toLocation)
      destination['latitude'] = toLocation.lat;
      destination['longitude'] = toLocation.lng;
      console.log("These is the destination: ", destination)
   }

   // If there now exists a latitude or longitude coordinate inside of destination object, render Map with route
   if (Object.keys(destination).length) {
      return (
         <MapView
            initialRegion={{
               latitude: region.latitude,
               longitude: region.longitude,
               latitudeDelta: region.latitudeDelta,
               longitudeDelta: region.longitudeDelta,
            }}
            ref={refContainer}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            customMapStyle={hour > 18 || hour < 6 ? aubergineMapStyle : silverMapStyle}
            style={[
               styles.map,
               style
            ]}
            scrollEnabled={scrollEnabled}
            {...props}
         >
            <MapViewDirections
               origin={origin}
               destination={destination}
               apikey={GOOGLE_MAPS_APIKEY}
               strokeWidth={3}
               strokeColor="purple"
               onStart={(params) => {
                  console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
               }}
               onReady={result => {
                  console.log(`Distance: ${result.distance} km`)
                  console.log(`Duration: ${result.duration} min`)

                  refContainer.current.focus();
                  refContainer.current.fitToCoordinates(result.coordinates, {
                     edgePadding: {
                        right: (width / 20),
                        bottom: (height / 20),
                        left: (width / 20),
                        top: (height / 20),
                     }
                  });
               }}
               onError={(errorMessage) => {
                  console.log('GOT AN ERROR');
               }}
            />
         </MapView>
      );
   } else {
      return (
         <MapView
            region={region}
            showsUserLocation={true} // enables geoLocation on the phone and asks new user to 'Deny' or 'Allow'
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            customMapStyle={hour > 18 || hour < 6 ? aubergineMapStyle : silverMapStyle}
            style={[
               styles.map,
               style
            ]}
            scrollEnabled={scrollEnabled}
            {...props}
         />
      );
   }
};

const styles = StyleSheet.create({
   map: {
      ...StyleSheet.absoluteFillObject,
   },
});

export default memo(MapBackground);
