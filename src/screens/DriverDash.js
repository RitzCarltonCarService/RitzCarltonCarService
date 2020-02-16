import React, { memo, useState, useEffect } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import { navigate, toHome } from '../redux/actions';
import { View, StyleSheet, Alert } from 'react-native';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { units } from '../core/untilities';
import DriveSched from '../layouts/Driver-Sched-Component/DriveSched';
import DriveClock from '../layouts/Driver-Clock-Component/DriveClock';
import MenuButton from '../components/MenuButton';
import Bread from '../components/Bread';
import { updateShifts } from '../redux/actions';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

const DriverDash = (props) => {
   const [veil, setVeil] = useState("schedule");
   const [visible, setVisibility] = useState(false);
   const [componentDidMount, setComponentDidMount] = useState(false);

   const getShifts = function () {
      return new Promise((resolve, reject) => {
         axios.get('http://ritzcarservice.us-east-2.elasticbeanstalk.com/api/getShifts', {
            params: {
               driverId: props.userData.uid
            }
         })
         .then(res => {
            resolve(res.data);
         })
         .catch(err => {
            reject(err)
         })
      })
   }
      // [ 
      //    { 
      //       id (int),
      //       carId (int),
      //       startTime (datetime),
      //       endTime (dateTime), 
      //       pickup: [{ 
      //          id,
      //          availabilityId,
      //          passengerId,
      //          startAddress,
      //          startLat,
      //          startLng,
      //          endAddress,
      //          endLat,
      //          endLng,
      //          estimatedStartTime,
      //          estimatedEndTime
      //       }, ...]
      //    } 
      // ]

   const checkShiftTime = function (start, end) {
      const now = new Date();
      if (new Date(start) < now && new Date(end) > now) {
         return true;
      } else {
         return false;
      }
   }

   const getCarId = function (availabilities) {
      for (let i = 0; i < availabilities.length; i++) {
         if (checkShiftTime(availabilities[i].startTime, availabilities[i].endTime)) {
            return availabilities[i].carId
         }
      }
      return null;
   }

   const getCurrentLocation = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
         Alert.alert(
            'Please be Advised',
            'This app will not work without location services enabled.',
            [
               { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
         );
         setError('Permission to access location was denied');
      };
      return await Location.getCurrentPositionAsync({});
   };

   console.log(componentDidMount);

   if (!componentDidMount){
      setComponentDidMount(true);
      getShifts()
      .then(res => {

         console.log(res);

         setInterval(() => {
            let id = getCarId(res);
            if (!id) {
               return;
            }

            console.log("CARID: " + id);

            getCurrentLocation()
            .then((position) => {
               return axios.post('http://ritzcarservice.us-east-2.elasticbeanstalk.com/api/car', {
                  id: id,
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
               })
            })
            .then (data => {
               if (data.data === "New info") {
                  console.log("There's new info");
                  return axios.get('http://ritzcarservice.us-east-2.elasticbeanstalk.com/api/getShifts', {
                     params: {
                        driverId: props.userData.uid
                     }
                  })
                  .then (res => {
                     console.log("Got the new info");
                     console.log(res.data);
                     Alert.alert(
                        'New Pickup',
                        'A pickup was added to your schedule.',
                        [
                          {
                            text: 'Okay',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                        ],
                        {cancelable: false},
                      );
                     
                     console.log("Grabbing new info");
                     console.log(res.data);
                     props.updateShifts(res.data);
                  })
                  .catch (err => {
                     console.log(err);
                  })
               }

            })
         }, 10000);

         console.log("Data: ");
         props.updateShifts(res);
      })
      .catch (err => {
         console.log(err);
      })
   }

   return (
      // initialGet() ----------------------------------------- uncomment when working to
      <>
      <View style={styles.container}>
         {(() => {
            switch (veil) {
               case "Schedule":
                  return (
                        <DriveSched />
                  )
               case "Clock":
                  return (
                        <DriveClock />
                  )
               default:
                  return (
                        <DriveClock />
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
         userData={props.userData}
       />
      <MenuButton onPress={() => setVisibility(true)} setVisibility={setVisibility} />
      </>
   )
}

const styles = StyleSheet.create({
   container: {
      height: 100 * units.vh,
      width: 100 * units.vw,
      alignItems: "center"
   }
});

const mapStateToProps = ({ userData, shifts }) => ({ userData, shifts })

const mapDispatchToProps = { updateShifts: updateShifts }

export default connect(mapStateToProps, mapDispatchToProps)(DriverDash);
