/*
 * The mapBackground is a background made using react-native-maps mapView
 * react-native-maps mapView docs: https://github.com/react-native-community/react-native-maps/blob/HEAD/docs/mapview.md
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Params ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * @style - TYPE: Object, DESC: Allows you to add more styling to the button on top of the default ones
 * @region - TYPE: Object, DESC: The region to be displayed by the map. The region is defined by the center coordinates
 *           and the span of coordinates to display.
 * @scrollEnabled - TYPE: Boolean, DEFAULT VALUE: true, DESC: If false the user won't be able to change the map region being displayed.
 * @props - TYPE: Varied, DESC: Any other react-native-paper button props,
 *          please see the react-native-maps mapView docs for a full list of the other availible props
 */

// When user selects a from and a two location, pass both to Redux Store
//  in MapBackground, create conditional rendering based on coordinates in Redux store (ensure
//  there are coordinates, and not blank strings)

// In Map Background, import MapViewDirections and conditionally render when
//  there is both a From and a To Location in redux store

import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { aubergineMapStyle, silverMapStyle } from '../core/mapStyles';

const MapBackground = ({ style, region, scrollEnabled, ...props }) => {
   let hour = new Date().getHours();

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
};

const styles = StyleSheet.create({
   map: {
      ...StyleSheet.absoluteFillObject,
   },
});

export default memo(MapBackground);
