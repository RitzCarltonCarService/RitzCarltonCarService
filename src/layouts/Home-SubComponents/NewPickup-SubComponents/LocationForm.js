import { connect } from 'react-redux';
import React, { useState } from 'react';
import { navigate, updateToLocation, updateFromLocation } from '../../../redux/actions';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { Button as RegButton } from "react-native-paper";
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import {Surface} from "react-native-paper";
import DateAndTimePicker from './DateTimePicker.js';
import useFunctionAsState from '../../../components/useFunctionAsState.js'
import TextInput from '../../../components/TextInput.js'
import FromLocationItem from './FromLocationItem';
import ToLocationItem from './ToLocationItem';
import { theme } from "../../../core/theme.js";
import axios from 'axios';

const LocationForm = ({ updateToLocation, updateFromLocation, ...props }) => {
    // MAKE SURE TO REMOVE GOOGLE MAPS API KEY BEFORE PUSHING TO GIT HUB!!!!!!!!

    // REMEMBER TO ADD API KEY IF YOU WANT TO SEARCH GOOGLE PLACES!!!!!!!!

    // Make current state of From Location to current location
    //  set text value of From Component to hooks' "From" state (initially, "Current Location")
    //  on click of Confirm button in From Location component, set FromComponent's state to input
    //  pass this to the Redux store to update From Location (to be used in Google API call in useEffect)

    // Bind "clear" functionality to TextInput for both To and From Location inputs (not working in sub-components)
    
    // Rendering of DateTimePicker on Click of Next to select date and time
    //  Adjust styling and rendering of this component !!!

    const GOOGLE_MAPS_APIKEY = '';

    // Hooks for storing 'toLocation' and 'fromLocation'
    const [fromLocation, setFrom] = useState('');
    const [toLocation, setTo] = useState('');

    // Hook for mounting initial From location of user
    const [componentDidMount, setMounted] = useState(false);

    // Hook to use different From location for rerendering purposes
    const [newFromLocation, changeFrom] = useState(null);

    // Hook to allow for saving of inputValue in From/To TextInput fields
    const [newFromInputValue, changeFromInput] = useState(false);
    const [newToInputValue, changeToInput] = useState(false);

    // If the user has enabled their geoLocation, set this as the default value in the From Text Input
    if (props.geoLocation) {
        // If component has not mounted, request geolocation
        if (!componentDidMount) {
            let lat = props.geoLocation.latitude;
            let long = props.geoLocation.longitude;
            let coords = lat + "," + long; 
    
            axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    latlng: coords,
                    key: GOOGLE_MAPS_APIKEY
                }
              })
              .then((response) => {
                // console.log("This is the geocoding response: ", response.data.results[1].formatted_address)
                setFrom(response.data.results[1].formatted_address);
                // Setting current from value as default until user changes text input field
                changeFrom(false);
                // Setting componentDidMount to true
                setMounted(true);
                console.log("This is the new from Location: ", fromLocation)
              })
              .catch((error) => {
                console.log(error);
              });
        }    
    }

    // Store a function to be executed somewhere else
    const [fromFunc, setFromFunc] = useFunctionAsState(null);
    const [toFunc, setToFunc] = useFunctionAsState(null);

    // Initial states of Text Input for To/From 
    const [focusedThing, setFocusedThing] = useState(false);
    
    // Initial state of From/To destination results
    const [fromResults, setFromResults] = useState([]);
    const [toResults, setToResults] = useState([]);

    // Hooks to display date/time component and set date/time
    const [showTimePicker, setTimePicker] = useState(false);
    
    // Setting date for date/time picker
    const [currentDate, setDate] = useState(new Date());
    
    const updateFromState = (newFromLocation) => {
        setFrom(newFromLocation);
        props.setFrom(fromLocation);
    };

    const updateToState = (newToLocation) => {
        setTo(newToLocation);
        props.setTo(toLocation);
    };

    const updateDate = (selectedDate) => { 
        setDate(selectedDate);
        props.setTime(currentDate);
    }

    // Resets focus of From text input to display selected address via from-location drop down menu
    const setFromValue = () => {
        changeFromInput(false)
    }

    // Resets focus of To text input to display selected address via to-location drop down menu
    const setToValue = () => {
        changeToInput(false)
    }

    const viewTimePicker = (bool) => {
        setTimePicker(bool);
    }

    // Figure out a way to autopopulate TextInput with user's current geolocation
    //  onChange of this TextInput, call a state Function and re-render with TextInput with Google AutoComplete
    
    return (
        <View styles={styles.container}>
            <Surface style={styles.surface}>
                <React.Fragment>
                    <GoogleAutoComplete apiKey={GOOGLE_MAPS_APIKEY} debounce={300} components="country:usa">
                        {({ inputValue, handleTextChange, locationResults, fetchDetails, clearSearch }) => (
                            <View style={styles.fromWrapper}>
                                {setFromFunc(clearSearch)}
                                {setFromResults(locationResults)}
                                {newFromLocation === false &&
                                    <React.Fragment>
                                        <TextInput style={{
                                            width: 300,
                                            paddingLeft: 40 
                                            }}
                                            editable={true}
                                            value={'Current Location'}
                                            onFocus={() => changeFrom(true)}
                                            clearTextOnFocus={true}
                                        />
                                    </React.Fragment>
                                }
                                {newFromLocation === true && newFromInputValue === false &&
                                    <React.Fragment>
                                        <TextInput style={{
                                            width: 300,
                                            paddingLeft: 40 
                                            }}
                                            editable={true}
                                            defaultValue={inputValue}
                                            value={fromLocation}
                                            onFocus={() => {setFocusedThing(1)}}
                                            onChangeText={() => changeFromInput(true)} // < -- pass this down!!!!
                                            autoFocus={true}
                                        />
                                    </React.Fragment>
                                }
                                {newFromLocation === true && newFromInputValue === true &&
                                    <React.Fragment>
                                        <TextInput style={{
                                            width: 300,
                                            paddingLeft: 40 
                                            }}
                                            editable={true}
                                            defaultValue={inputValue}
                                            value={inputValue}
                                            onFocus={() => {setFocusedThing(1)}}
                                            onChangeText={handleTextChange}
                                            autoFocus={true}
                                        />
                                    </React.Fragment>
                                }
                            </View>
                        )}
                    </GoogleAutoComplete>
                    <GoogleAutoComplete apiKey={GOOGLE_MAPS_APIKEY} debounce={300} components="country:usa">
                        {({ inputValue, handleTextChange, locationResults, fetchDetails, clearSearch }) => (
                            <View style={styles.toWrapper}>
                                {setToFunc(clearSearch)}
                                {setToResults(locationResults)}
                                {newToInputValue === false &&
                                    <React.Fragment>
                                        <TextInput style={{
                                            width: 300,
                                            paddingLeft: 40 
                                            }}
                                            placeholder="Where are you going?"
                                            autoFocus={true}
                                            editable={true}
                                            defaultValue={inputValue}
                                            value={toLocation}
                                            onFocus={() => {setFocusedThing(2)}}
                                            onChangeText={() => changeToInput(true)}
                                        />
                                    </React.Fragment>
                                }
                                {newToInputValue === true &&
                                    <React.Fragment>
                                        <TextInput style={{
                                            width: 300,
                                            paddingLeft: 40 
                                            }}
                                            editable={true}
                                            autoFocus={true}
                                            defaultValue={inputValue}
                                            value={inputValue}
                                            onFocus={() => {setFocusedThing(2)}}
                                            onChangeText={handleTextChange}                                 
                                            onEndEditing={() => {changeToInput(false)}}
                                        />
                                    </React.Fragment>
                                }
                            </View>
                        )}
                    </GoogleAutoComplete>
                </React.Fragment>
            </Surface>
            <ScrollView style={{ maxHeight: 200, paddingLeft: '10%' }} keyboardShouldPersistTaps={'always'}>
                {focusedThing === 1 ?
                    fromResults.map((el, i) => (
                        <FromLocationItem
                            {...el}
                            key={el.id}
                            googAPI={GOOGLE_MAPS_APIKEY}
                            clearFromSelections={fromFunc}
                            updateFromState={updateFromState}
                            updateFromLocation={updateFromLocation}
                            setFromValue={setFromValue}
                        >
                        </FromLocationItem>
                    )) :
                    toResults.map((el, i) => (
                        <ToLocationItem
                            {...el}
                            key={el.id}
                            googAPI={GOOGLE_MAPS_APIKEY}
                            clearToSelections={toFunc}
                            updateToState={updateToState}
                            updateToLocation={updateToLocation}
                            viewTimePicker={viewTimePicker}
                            setToValue={setToValue}
                        >
                        </ToLocationItem>
                    ))
                }
            </ScrollView>
            {fromLocation === '' && toLocation === '' && (!showTimePicker) &&
                <View style={styles.buttonContainer}>
                    <RegButton 
                        style={[
                            styles.backOnlyButton,
                            { backgroundColor: theme.colors.surface }
                        ]}
                        title="Back" mode="outlined" onPress={() => console.log('Pressed')}>
                    </RegButton>
                </View> 
            }
            {fromLocation === '' || toLocation === '' && (!showTimePicker) &&
                <View style={styles.buttonContainer}>
                    <RegButton 
                        style={[
                            styles.backOnlyButton,
                            { backgroundColor: theme.colors.surface }
                        ]}
                        title="Back" mode="outlined" onPress={() => console.log('Pressed')}>
                    </RegButton>
                </View> 
            }
            {fromLocation !== '' && toLocation !== '' &&              
                <View style={styles.buttonContainer}>  
                    <DateAndTimePicker currentDate={currentDate} setTimePicker={setTimePicker} updateDate={updateDate} />
                </View>
            }  
        </View>
    )
}        

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    surface: {
        flex: 1,
        width: '100%',
        maxHeight: '33%',
        paddingVertical: 0,
        alignContent: 'center',
        justifyContent: 'flex-start'
    },
    scroll: {
        flex: 1,
        width: 450,
        maxHeight: '33%',
    },
    buttonContainer: {
        maxHeight: '33%',
        width: "100%",
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    fromWrapper: {
        flex: 1,
        width: 325,
        height: 60,
        marginVertical: 0,
        paddingVertical: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    toWrapper: {
        flex: 1,
        width: 325,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center'
    },
    nextButton: {
        maxHeight: "40%",
        marginVertical: "5%",
        width: "100%",
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
        borderRadius: 10
    },
    backButton: {
        maxHeight: "40%",
        width: "100%",
        marginVertical: "5%",
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
        borderRadius: 10
    },
    backOnlyButton: {
        top: '50%',
        maxHeight: "100%",
        width: "100%",
        marginVertical: "5%",
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
        borderRadius: 10
    },
    text: {
        fontFamily: Platform.OS === 'ios' ? "Arial" : "Roboto",
        letterSpacing: 2,
        fontWeight: "bold",
        fontSize: 15,
        lineHeight: 40,
        color: theme.colors.secondary,
    }
});

const mapStateToProps = state => {
    console.log('This is state: ', state)
    return {
        geoLocation: state.geoLocation,
    }
}

const mapDispatchToProps = {
    navigate: navigate,
    updateToLocation: updateToLocation,
    updateFromLocation: updateFromLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationForm);