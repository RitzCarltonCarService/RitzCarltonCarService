import React, { memo, useState, useEffect } from "react";
import { connect } from 'react-redux';
import { navigate, toHome } from '../redux/actions';
import { View, StyleSheet } from 'react-native';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { units } from '../core/untilities';
import DriveSched from '../layouts/Driver-Sched-Component/DriveSched';
import DriveClock from '../layouts/Driver-Clock-Component/DriveClock';

const DriverDash = props => {
   const [veil, setVeil] = useState("clock");
   const [visible, setVisibility] = useState(false);

   return (
      <View style={styles.container}>
         {(() => {
            switch (veil) {
               case "schedule":
                  return (
                     <DriveSched setPage={setVeil} />
                  )
               case "path":
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
   )
}

// const mapStateToProps = state => {
//    return {
//       nav: state.nav
//    }
// }

// const mapDispatchToProps = {
//    navigate: navigate
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
   container: {
      height: 100 * units.vh,
      width: 100 * units.vw,
      alignItems: "center"
   }
})

export default DriverDash;
