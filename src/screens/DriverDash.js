import React, { memo, useState, useEffect } from "react";
import { connect } from 'react-redux';
import { navigate, toHome } from '../redux/actions';
import { View, StyleSheet } from 'react-native';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
const { vh, vw } = require('react-native-viewport-units');
import DriveSched from '../layouts/Driver-Sched-Component/DriveSched';
import DriveClock from '../layouts/Driver-Clock-Component/DriveClock';
import MenuButton from '../components/MenuButton';

const DriverDash = props => {
   const [veil, setVeil] = useState("clock");
   const [visible, setVisibility] = useState(true);

   return (
      <>
      <View style={styles.container}>
         {(() => {
            switch (veil) {
               case "schedule":
                  return (
                        <DriveSched setPage={setVeil} />
                  )
               case "clock":
                  return (
                        <DriveClock setPage={setVeil} />
                  )
               default:
                  return (
                        <DriveClock setPage={setVeil} />
                  )
            }
         })()}
      </View>
      <MenuButton onPress={() => setVisibility(true)} setVisibility={setVisibility} />
      </>
   )
}

const styles = StyleSheet.create({
   container: {
      height: 100 * vh,
      width: 100 * vw,
      alignItems: "center"
   }
})

export default DriverDash;
