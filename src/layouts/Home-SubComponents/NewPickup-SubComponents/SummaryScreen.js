import axios from 'axios';
import React, { memo } from 'react';
import Moment from 'moment';
import { connect } from 'react-redux';
import { updateScheduledPickups, updateToLocation, updateFromLocation } from '../../../redux/actions';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { IconButton, Button as AccountButton } from 'react-native-paper';
import { State } from 'react-native-gesture-handler';
import TheWhiteSquare from '../../../components/TheWhiteSquare';
import getPickups from '../../../components/getPickups';
import Logo from '../../../components/Logo';
import Button from '../../../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';

const SummaryScreen = props => {
    let momentJSdate = props.requestObject.time ? props.requestObject.time : new Date();

    console.log("This is the requestObject: ", props.requestObject)
    let pickUpData = {};

    let momentHoursMins = Moment(props.requestObject.time).format("hh:mm:ss a");
    // Creating expected time of arrival
    let expectedArrivalTime = Moment(props.requestObject.time).add(parseInt(props.requestObject.duration), 'm').format("hh:mm:ss a");
    let date = Moment(momentJSdate).format("LL");

    pickUpData['hotelId'] = 1; // maybe change in the future!
    pickUpData['startTime'] = props.requestObject.time; // maybe change in the future!
    pickUpData['startHoursMins'] = momentHoursMins;
    pickUpData['startAddress'] = props.requestObject.from;
    pickUpData['startLat'] = props.requestObject.fromCoordinates.lat;
    pickUpData['startLng'] = props.requestObject.fromCoordinates.lng;
    pickUpData['endAddress'] = props.requestObject.to;
    pickUpData['endLat'] = props.requestObject.toCoordinates.lat;
    pickUpData['endLng'] = props.requestObject.toCoordinates.lng;
    pickUpData['passengerId'] = props.userData.uid;
    pickUpData['email'] = props.userData.email;
    pickUpData['name'] = props.userData.displayName;
    pickUpData['rideShare'] = props.requestObject.rideShare;
    pickUpData['expectedArrivalTime'] = expectedArrivalTime; 
    pickUpData['duration'] = props.requestObject.duration;
    pickUpData['distance'] = props.requestObject.distance;
    pickUpData['luggage'] = props.requestObject.bags;
    pickUpData['travelers'] = props.requestObject.passengers;
    pickUpData['date'] = date;

    console.log("This is pickUpDate object: ", pickUpData)

    // REMEMBER! The below might have to be added when Scheduled requests are for the same day
    // if (props.immediateLocation) {
    //     console.log("This is the newFromLocation: ", props.immediateLocation)
    //     pickUpData['specifiedStartTime'] = null;
    // }

    // Setting totalPassengers with a default of 1 if there are not other travelers with resident
    let totalPassengers = 1 + parseInt(props.passengers);

    return (
        <View>
            <TheWhiteSquare height={70} style={{ borderWidth: 3 }}>
                <View style={styles.requestScreen}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            Your new Pick-up
                    </Text>
                        <Text style={styles.title}>
                            Request:
                    </Text>
                        <View style={styles.divider} />
                    </View>
                    <View style={styles.descriptor}>
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>Date: </Text>
                            {Moment(momentJSdate).format("LLL")}
                    </Text>
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>Pick-Up Location: </Text>
                            {props.requestObject.from}
                    </Text>
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>Destination: </Text>
                            {props.requestObject.to}
                    </Text>
                    </View>
                    <View style={styles.carAndDriver}>
                        <IconButton icon="briefcase" size={50} color="black"></IconButton>
                        <View>
                            <Text style={{ fontWeight: "bold", fontSize: 16}}>Number of Bags: </Text>
                            <Text style={styles.bagsAndPassengers}> {props.bags} </Text>
                        </View>
                    </View>
                    <View style={styles.carAndDriver}>
                        <IconButton icon="account-group" size={50} color="black"></IconButton>
                        <View style={{ marginTop: "5%" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16}}>Number of Passengers: </Text>
                            <Text style={styles.bagsAndPassengers}>{totalPassengers}</Text>
                        </View>
                    </View>
                    <View style={styles.logoContainer}>
                        <Button
                            onPress={() => {
                                // Posting new ride request to the database
                                axios.post('http://ritzcarservice.us-east-2.elasticbeanstalk.com/api/newPickup', {
                                    pickupData: pickUpData
                                })
                                .then((response) => {
                                    if (response.data !== "Pickup added!") {
                                        Alert.alert(
                                            'No Drivers Available at this Time!',
                                            'Would you be interested in sharing this ride?',
                                            [
                                                {text: 'No', onPress: () => {
                                                    // Reset both the From and To Locations to be the same
                                                    let resetOrigin = {};
                                                    resetOrigin['lat'] = props.geoLocation.latitude;
                                                    resetOrigin['lng'] = props.geoLocation.longitude; 
                                                    
                                                    getPickups(props.userData.uid, props.updateScheduledPickups);
                                                    props.setPage("home");
                                                    props.updateToLocation(null);
                                                    props.updateFromLocation(resetOrigin);
                                                }},
                                                {text: 'Yes', onPress: () => {
                                                    // Reset both the From and To Locations to be the same
                                                    let resetOrigin = {};
                                                    resetOrigin['lat'] = props.geoLocation.latitude;
                                                    resetOrigin['lng'] = props.geoLocation.longitude; 
                                                    
                                                    getPickups(props.userData.uid, props.updateScheduledPickups);
                                                    props.setRideShare(true);
                                                    props.setPage("home");
                                                    props.updateToLocation(null);
                                                    props.updateFromLocation(resetOrigin);
                                                }}
                                            ],
                                            {cancelable: false},
                                        );
                                    } else {
                                        Alert.alert(
                                            'New Request Submitted - Driver Notified!',
                                            'You will be notified when your driver is nearby.',
                                            [
                                                {text: 'OK', onPress: () => {
                                                    // On submission of new scheduled ride, then repopulate Scheduled Pick-ups with data
                                                    // Reset both the From and To Locations to be the same
                                                    let resetOrigin = {};
                                                    resetOrigin['lat'] = props.geoLocation.latitude;
                                                    resetOrigin['lng'] = props.geoLocation.longitude; 
                                                    
                                                    getPickups(props.userData.uid, props.updateScheduledPickups);
                                                    props.setPage("home");
                                                    props.updateToLocation(null);
                                                    props.updateFromLocation(resetOrigin);
                                                }} 
                                            ],
                                            {cancelable: false},
                                        );
                                    }
                                })
                                .catch((error) => {
                                    props.setPage("home");
                                    console.log(error);
                                });
                            }}
                        >
                            Submit Ride Request
                    </Button>
                    </View>
                    <View style={styles.logoBox}>
                        <Logo style={{ height: 100, width: 100 }} />
                    </View>
                </View>
            </TheWhiteSquare>
            <View style={styles.buttonContainer}>
                <Button onPress={() => { props.setForm(2) }}>
                    Back
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    requestScreen: {
        width: "100%",
        alignContent: "center",
        top: "5%",
    },
    titleContainer: {
        width: "100%",
        alignItems: "center",
    },
    title: {
        fontFamily: Platform.OS === 'ios' ? "Arial" : "Roboto",
        fontSize: 25,
        letterSpacing: 2,
        top: "12%",
    },
    divider: {
        borderBottomColor: "black",
        borderBottomWidth: 1,
        width: "100%",
        top: "15%",
    },
    descriptor: {
        fontFamily: Platform.OS === 'ios' ? "Arial" : "Roboto",
        fontSize: 14,
        letterSpacing: 2,
        flexDirection: 'column',
        alignSelf: 'flex-start',
        top: "3%",
    },
    carAndDriver: {
        flexDirection: "row",
        position: 'relative',
        width: "100%",
        paddingRight: "35%",
        top: "8%",
    },
    logoContainer: {
        width: "100%",
        top: '0%',
    },
    logoBox: {
        alignSelf: "center",
        top: "-5%",
    },
    buttonContainer: {
        top: "18%",
    },
    bagsAndPassengers: {
        fontWeight: "bold",
        fontSize: 18, 
        color: 'purple',
    }
})

const mapStateToProps = state => {
    return {
        nav: state.nav,
        userData: state.userData,
        fromLocation: state.fromLocation,
        toLocation: state.toLocation,
        geoLocation: state.geoLocation
    }
}

const mapDispatchToProps = {
    updateScheduledPickups: updateScheduledPickups,
    updateFromLocation: updateFromLocation,
    updateToLocation: updateToLocation,
    updateScheduledPickups: updateScheduledPickups
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(SummaryScreen));


