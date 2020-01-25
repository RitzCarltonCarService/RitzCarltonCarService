import React, { memo, useState, useEffect } from "react";
import { connect } from 'react-redux';
import { navigate, toHome } from '../redux/actions';
import { View, StyleSheet } from 'react-native';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
const { vh, vw } = require('react-native-viewport-units');
import DriveSched from '../layouts/Driver-Sched-Component/DriveSched';
import DriveClock from '../layouts/Driver-Clock-Component/DriveClock';
import MenuButton from '../components/MenuButton';
import Bread from '../components/Bread';

const DriverDash = props => {
   const [veil, setVeil] = useState("schedule");
   const [visible, setVisibility] = useState(false);

   return (
      <>
      <View style={styles.container}>
         {(() => {
            switch (veil) {
               case "Schedule":
                  return (
                        <DriveSched setVeil={setVeil} />
                  )
               case "Clock":
                  return (
                        <DriveClock setVeil={setVeil} />
                  )
               default:
                  return (
                        <DriveClock setVeil={setVeil} />
                  )
            }
         })()}
      </View>
      <Bread 
         headerOne={`Clock`} 
         headerTwo={`Schedule`} 
         visible={visible} 
         onDismiss={() => setVisibility(false)}
         func={(component) => {
            setVeil(component)
            setVisibility(false)
         }}
       />
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
