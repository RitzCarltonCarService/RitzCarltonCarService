import axios from 'axios';
import Moment from 'moment';
import { connect } from 'react-redux';
import { updateFromLocation, updateToLocation } from '../../../../redux/actions';
import React, { useState, memo } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert, TouchableOpacity, Text, Platform } from 'react-native';
import { Surface } from "react-native-paper";
import { theme } from "../../../../core/theme.js";
import Button from '../../../../components/Button';
import DateAndTimePicker from './DateAndTimePicker.js';
import LocationMapView from './LocationMapView.js';
import getPickups from '../../../../components/getPickups';
import { updateScheduledPickups } from '../../../../redux/actions';

const LocationForm = ({ updateFromLocation, updateToLocation, ...props }) => {
    // MAKE SURE TO REMOVE GOOGLE MAPS API KEY BEFORE PUSHING TO GIT HUB!!!!!!!!
    // REMEMBER TO ADD API KEY IF YOU WANT TO SEARCH GOOGLE PLACES!!!!!!!!
    
    // Rendering of DateTimePicker on Click of Next to select date and time
    //  Adjust styling and rendering of this component !!!
    
    // If there is a From and a To location in state hooks, render Location page with two Text fields
    //  that contain the To and From coordinates ---> allow both to be clickable and to return to original Location form 
    //      ---> best way to transition on returning back to form
    //  Also create a back button (arrow) to be placed to the left of the To and From location Text fields to
    //      also navigate back to original Location form input fields
    //  Then allow for Date/Time picker to show, and underneath create a Next and Back button
    //      only enable Next button as clickable when a date in the future is selected
    //  If the button "Schedule a Ride Now", do not display the Time/Date picker (set another hook to only render
    //      selection input fields)
    

    const GOOGLE_MAPS_APIKEY = 'AIzaSyBpktIvH-LC6Pwrp0ShC7NbjH5AqoySf8s';

    // Hooks for storing 'toLocation' and 'fromLocation'
    const [fromLocation, setFromLocation] = useState(null);
    const [toLocation, setToLocation] = useState(null);

    // Hook for mounting initial From location of user
    const [componentDidMount, setMounted] = useState(false);

    // Hook to use different From location for rerendering purposes
    const [newFromLocation, changeFrom] = useState(null);

    // Using user's geoLocation to get their actual address
    getReverseGeocode = async () => {
        if (props.geoLocation) {
            // If component has not mounted, request reverse geolocation
            if (!componentDidMount) {
                let lat = props.geoLocation.latitude;
                let long = props.geoLocation.longitude;
                let coords = lat + "," + long;

                let res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords}&key=${GOOGLE_MAPS_APIKEY}`);
                // console.log("This is the response: ", res);
                let address = res.data.results[1].formatted_address
                // Setting initial from location to user's current geoLocation address
                setFromLocation(address);
                props.setFrom(address);
                // Setting current from value as default until user changes text input field
                changeFrom(false);
                // Setting componentDidMount to true
                setMounted(true);
                // Setting Redux state to user's current location
                updateFromLocation(res.data.results[1].geometry.location)
            }
        }
    }
    // Get user's reverse geoCoded address
    getReverseGeocode();
    // Store new From location in hook and in redux
    const updateFromState = (newFromLocation) => {
        setFromLocation(newFromLocation);
        // console.log("This is the newFromLocation: ", fromLocation)
        props.setFrom(newFromLocation);
    };
    
    // Store new To location in hook and in redux
    const updateToState = (newToLocation) => {
        setToLocation(newToLocation);
        // console.log("This is the newToLocation: ", newToLocation)
        props.setTo(newToLocation);
    };
    
    /* DATE COMPONENTS */
    
    // Setting date for date/time picker (Android)
    const [currentIoSDate, setIoSDate] = useState(null);
    
    // Setting date for date/time picker (Android)
    const [currentAndroidDate, setAndroidDate] = useState(null);
    const [rideAndroidTime, setAndroidTime] = useState(null);

    // Store new Time in hook and in redux
    // const updateTimeAndDate = (newToLocation) => {
    //     setTo(newToLocation);
    //     props.setTo(toLocation);
    // };

    if (props.scheduled) {
        if (fromLocation !== null && toLocation !== null) {
            return (
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                    <View style={styles2.container}>
                        <View style={styles2.mapAndAddressBox}>
                            <Surface style={styles2.addressBox}>
                                <TouchableOpacity style={styles2.fromAddress}
                                    onPress={() => {
                                        setFromLocation(null);
                                    }}>
                                    <Text numberOfLines={1}>
                                        {fromLocation}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles2.toAddress}
                                    onPress={() => {
                                        setToLocation(null);
                                    }}>

                                    <Text numberOfLines={1}>
                                        {toLocation}
                                    </Text>
                                </TouchableOpacity>
                            </Surface>
                        </View>
                        {Platform.OS === 'ios' && currentIoSDate === null &&
                            <DateAndTimePicker
                                currentIoSDate={currentIoSDate}
                                setIoSDate={setIoSDate}
                                currentAndroidDate={currentAndroidDate}
                                setAndroidDate={setAndroidDate}
                                setAndroidTime={setAndroidTime}
                                changeFrom={props.changeFrom}
                            >
                            </DateAndTimePicker>
                        }
                        {Platform.OS === 'android' && currentAndroidDate === null &&
                            <DateAndTimePicker
                                currentIoSDate={currentIoSDate}
                                setIoSDate={setIoSDate}
                                currentAndroidDate={currentAndroidDate}
                                setAndroidDate={setAndroidDate}
                                setAndroidTime={setAndroidTime}
                                changeFrom={props.changeFrom}
                            >
                            </DateAndTimePicker>
                        }
                        <Surface style={styles2.timeAndDateBox}>
                            <View style={styles2.requestBorder}>
                                {Platform.OS === 'ios' &&
                                    <TouchableOpacity 
                                        onPress={() => {
                                            setIoSDate(null);
                                        }}>
                                        <Text style={styles2.requestText}>New Scheduled Request Date:</Text>
                                        <Text style={styles2.requestText}>
                                            {Moment(currentIoSDate).format("LLL")}
                                        </Text>
                                    </TouchableOpacity>
                                }
                                {Platform.OS === 'android' &&
                                    <TouchableOpacity 
                                        onPress={() => {
                                            setAndroidDate(null);
                                        }}>
                                        <Text style={styles2.requestText}>New Scheduled Request Date:</Text>
                                        <Text style={styles2.requestText}>
                                            {Moment(currentAndroidDate).format("LLL")}
                                        </Text>
                                    </TouchableOpacity>
                                }
                            </View>
                            <View style={styles2.buttonBox}>
                                <Button style={styles2.backButton} onPress={() => {setToLocation(null)}}>Back</Button>
                                <Button style={styles2.nextButton} 
                                        onPress={() => {
                                            if (Platform.OS === 'ios') {
                                                props.setTime(currentIoSDate)
                                            } else if (Platform.OS === 'android') {
                                                let timeObj = {
                                                    date: currentAndroidDate,
                                                    time: rideAndroidTime
                                                }
                                                props.setTime(timeObj)
                                            };
                                            props.setForm(1);
                                        }}>
                                    Next
                                </Button>
                            </View>
                        </Surface>
                    </View>
                </TouchableWithoutFeedback>
            )
        } else {
            return (
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                    <View styles={styles.container}>
                        <LocationMapView styles={styles.contentBox}
                            apiKey={GOOGLE_MAPS_APIKEY}
                            toLocation={toLocation}
                            fromLocation={fromLocation}
                            newFromLocation={newFromLocation}
                            changeFrom={changeFrom}
                            updateFromState={updateFromState}
                            updateToState={updateToState}
                        >
                        </LocationMapView>
                        <View styles={styles.buttonBox}>
                            <Button styles={styles.nextButton}
                                mode='contained'
                                onPress={() => {

                                    if (!toLocation) {
                                        Alert.alert(
                                            'We\'re Sorry!',
                                            'Please input a destination before continuing.',
                                            [
                                                { text: 'OK', onPress: () => console.log('OK Pressed') },
                                            ],
                                            { cancelable: false },
                                        );
                                    } else {
                                        props.setTime(new Date());
                                        props.setForm(1)
                                    }
                                }}
                            >
                                Next
                            </Button>
                            <Button styles={styles.backButton}
                                mode='contained'
                                onPress={() => {
                                    props.setPage("home");
                                    setFromLocation(null);
                                    setToLocation(null);
                                }}
                            >
                                Back
                            </Button>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )

        }
    } else {
        return (
            <View styles={styles.container}>
                <LocationMapView styles={styles.contentBox}
                    apiKey={GOOGLE_MAPS_APIKEY}
                    toLocation={toLocation}
                    fromLocation={fromLocation}
                    newFromLocation={newFromLocation}
                    changeFrom={changeFrom}
                    updateFromState={updateFromState}
                    updateToState={updateToState}
                >
                </LocationMapView>
                <View styles={styles.buttonBox}>
                    <Button styles={styles.nextButton}
                        mode='contained'
                        onPress={() => {
                            if (!toLocation) {
                                Alert.alert(
                                    'We\'re Sorry!',
                                    'Please input a destination before continuing.',
                                    [
                                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                                    ],
                                    { cancelable: false },
                                );
                            } else {
                                props.setTime(new Date());
                                props.setForm(1)
                            }
                        }
                        }
                    >
                        Next
                    </Button>
                    <Button styles={styles.backButton}
                        mode='contained'
                        onPress={() => {
                            props.setPage("home");
                            setFromLocation(null);
                            setToLocation(null);
                            updateFromLocation(null);
                            updateToLocation(null);
                            getPickups(props.userData.uid, props.updateScheduledPickups);
                        }}
                    >
                        Back
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '200%',
        height: '100%',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        justifyContent: 'center',
    },
    contentBox: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexGrow: 1,
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        justifyContent: 'center',
    },
    buttonBox: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    nextButton: {
        flex: 1,
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'space-around'
    },
    backButton: {
        flex: 1,
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
    }
});

// Conditional rendering of stylesheet for the display of time and date selection modals
const styles2 = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        alignContent: 'center',
    },
    mapAndAddressBox: {
        flex: 1,
        width: 500,
        marginVertical: 20,
        maxHeight: 75,
        alignItems: 'center',
        marginHorizontal: 20,
        flexGrow: 1,
    },
    addressBox: {
        flex: 1,
        width: 500,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row'
    },
    fromAddress: {
        flex: 1,
        width: 100,
        height: 30,
        marginLeft: 50,
        marginRight: 10,
        borderRadius: 10,
        paddingRight: 10,
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    toAddress: {
        flex: 1,
        width: 100,
        height: 30,
        marginLeft: 10,
        marginRight: 50,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    timeAndDateBox: {
        flex: 1,
        top: '50%',
        width: 500,
        maxHeight: 200,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        textAlign: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    buttonBox: {
        flex: 1,
        width: 500,
        maxHeight: 200,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    requestText: {
        fontFamily: Platform.OS === 'ios' ? "Arial" : "Roboto",
        letterSpacing: 2,
        fontWeight: "bold",
        fontSize: 15,
        lineHeight: 40,
        color: theme.colors.primary,
    },
    requestBorder: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        paddingRight: 10,
        paddingLeft: 10,
        marginTop: 10
    },
    backButton: {
        flex: 1,
        width: 100,
        height: 70,
        marginLeft: 50,
        marginRight: 10,
        paddingRight: 10,
        paddingLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    nextButton: {
        flex: 1,
        width: 100,
        height: 70,
        marginLeft: 10,
        marginRight: 50,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
});

const mapStateToProps = state => {
    // console.log('This is state: ', state)
    return {
        geoLocation: state.geoLocation,
        userData: state.userData
    }
}

const mapDispatchToProps = {
    updateToLocation: updateToLocation,
    updateFromLocation: updateFromLocation,
    updateScheduledPickups: updateScheduledPickups
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(LocationForm));
