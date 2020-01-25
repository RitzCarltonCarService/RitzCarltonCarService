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

import { connect } from 'react-redux';
import { updateRideDuration, updateRideDistance } from '../redux/actions';
import React, { memo, useRef } from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { aubergineMapStyle, silverMapStyle } from '../core/mapStyles';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import { vh, vw } from 'react-native-viewport-units';

const MapBackground = ({ style, region, scrollEnabled, fromLocation, toLocation, updateRideDistance, updateRideDuration, ...props }) => {
   // const ASPECT_RATIO = vw / vh;
   let hour = new Date().getHours();
   let origin = {};
   let destination = {};
   const GOOGLE_MAPS_APIKEY = '';
   const refContainer = useRef(null);

   if (fromLocation) {
      if (region.latitude !== fromLocation.lat && region.longitude !== fromLocation.lng) {
         origin['latitude'] = fromLocation.lat;
         origin['longitude'] = fromLocation.lng;
      }
   }

   if (toLocation) {
      destination['latitude'] = toLocation.lat;
      destination['longitude'] = toLocation.lng;
   }

   // If there now exists a latitude or longitude coordinate inside of destination object, render Map with route
   if (Object.keys(destination).length) {
      // dismissing keyboard after user has inputted new To and From location
      Keyboard.dismiss();

      return (
         <MapView
            initialRegion={{
               latitude: region.latitude,
               longitude: region.longitude,
               latitudeDelta: region.latitudeDelta,
               longitudeDelta: region.longitudeDelta,
            }}
            zoomEnabled
            zoomTapEnabled
            zoomControlEnabled
            scrollEnabled
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
            <MapView.Marker key={1} coordinate={origin} />
            <MapView.Marker key={2} coordinate={destination} />
            <MapViewDirections
               origin={origin}
               destination={destination}
               apikey={GOOGLE_MAPS_APIKEY}
               strokeWidth={5}
               strokeColor="purple"
               onStart={(params) => {
                  console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
               }}
               onReady={result => {
                  // Adding to Redux store the new distance and duration of user's selected route
                  updateRideDistance(result.distance + 'km')
                  updateRideDuration(result.duration + 'min')

                  // refContainer.current.fitToElements(true);
                  refContainer.current.fitToCoordinates(result.coordinates, {
                     edgePadding: {
                        right: 100,
                        bottom: 300,
                        left: 100,
                        top: 300
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
      alignItems: "center"
   }
});

const mapDispatchToProps = {
   updateRideDuration: updateRideDuration,
   updateRideDistance: updateRideDistance
}

export default connect(null, mapDispatchToProps)(memo(MapBackground));
