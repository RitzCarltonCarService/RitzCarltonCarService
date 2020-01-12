import React, { useState } from 'react';
import { connect } from 'react-redux';
import { navigate, toHome } from '../redux/actions';
import { View, StyleSheet } from 'react-native';
import MainScreen from '../layouts/Home-SubComponents/MainScreen';
import NewPickup from '../layouts/Home-SubComponents/NewPickup';
import PrePickupInfo from '../layouts/PickupInfo-SubComponents/PrePickupInfo';
import MapBackground from '../components/MapBackground'
import getCurrentLocation from '../redux/actions/index.js';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
const { vh, vw } = require('react-native-viewport-units');

const Home = props => {
   const [page, setPage] = useState("home");

   return (
      <View style={styles.container}>
         <MapBackground region={props.region}/>
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
   )
}

const mapStateToProps = state => {
   return {
      nav: state.nav,
      region: state.geoLocation
   }
}

const mapDispatchToProps = {
   navigate: navigate
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
   container: {
      height: 100 * vh,
      width: 100 * vw,
      alignItems: "center"
   }
})