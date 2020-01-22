import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { navigate, updateToLocation, updateFromLocation } from '../../../redux/actions';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import { Surface } from 'react-native-paper';
import TextInput from '../../../components/TextInput.js'
import FromLocationItem from './FromLocationItem';
import ToLocationItem from './ToLocationItem';

const LocationForm = ({ updateToLocation, updateFromLocation }) => {
    // MAKE SURE TO REMOVE GOOGLE MAPS API KEY BEFORE PUSHING TO GIT HUB!!!!!!!!

    // REMEMBER TO ADD API KEY IF YOU WANT TO SEARCH GOOGLE PLACES!!!!!!!!

    // When user selects a from and a two location, pass both to Redux Store
    //  in MapBackground, create conditional rendering based on coordinates in Redux store (ensure
    //  there are coordinates, and not blank strings)

    // In Map Background, import MapViewDirections and conditionally render when
    //  there is both a From and a To Location in redux store

    // Make current state of From Location to current location
    //  set text value of From Component to hooks' "From" state (initially, "Current Location")
    //  on click of Confirm button in From Location component, set FromComponent's state to input
    //  pass this to the Redux store to update From Location (to be used in Google API call in useEffect)

    // Make current state of To Location to empty string
    //  set text value of To Component to hooks' "To" state (initially, " ")
    //  on click of Confirm button in To Location component, set ToComponent's state to input
    //  pass this to the Redux store to update To Location (to be used in Google API call in useEffect)

    // Conditional rendering of DateTimePicker based on if toLocation and fromLocation both exist
    // Make current state of DateTimePicker to today (newDate())
    //  On confirmation of DateTimePicker component, add this to redux store

    // When Redux store contains From Location, To Location, and DateTimePicker values
    //  Call Google Directions API to re-render map background to show addresses stored in Redux store
    //  https://github.com/bramus/react-native-maps-directions
    //  https://stackoverflow.com/questions/40541095/render-multiple-marker-in-react-native-maps

    // Hooks for storing 'toLocation' and 'fromLocation'
    const [fromLocation, setFrom] = useState('');
    const [toLocation, setTo] = useState('');

    // Initial states of Text Input for To/From 
    const [focusedThing, setFocusedThing] = useState(false);

    // Initial state of From/To destination results
    const [fromResults, setFromResults] = useState([]);
    const [toResults, setToResults] = useState([]);

    const updateFromState = (fromLocation) => {
        setFrom(fromLocation);
    };

    const updateToState = (toLocation) => {
        setTo(toLocation);
    };

    // pass fromLocation to redux store and use to display an updated Map background based on from coordinates
    // useEffect(() => {
    //     console.log("This is the current fromLocation: ", fromLocation)
    //   }, [fromLocation]); // Only re-run the effect if count changes

    // pass fromLocation to redux store and use to display an updated Map background based on to coordinates
    // useEffect(() => {
    //     console.log("This is the current ToLocation: ", toLocation)
    // }, [toLocation]); // Only re-run the effect if count changes

    return (
        <View style={styles.container}>
            <Surface style={styles.surface}>
                <React.Fragment>
                    <GoogleAutoComplete apiKey="AIzaSyBpktIvH-LC6Pwrp0ShC7NbjH5AqoySf8s" debounce={300} components="country:usa">
                        {({ inputValue, handleTextChange, locationResults, fetchDetails, clearSearch }) => (
                            <View style={styles.fromWrapper}>
                                <React.Fragment>
                                    {setFromResults(locationResults)}
                                    <TextInput style={{
                                        width: 300,
                                        paddingLeft: 40
                                    }}
                                        editable={true}
                                        defaultValue={fromLocation}
                                        value={inputValue}
                                        onFocus={() => { setFocusedThing(1) }}
                                        onChangeText={handleTextChange}
                                        placeholder="Current Location..."
                                    />
                                    <Button title="Clear" onPress={() => { clearSearch }}></Button>
                                </React.Fragment>
                            </View>
                        )}
                    </GoogleAutoComplete>
                    <GoogleAutoComplete apiKey="AIzaSyBpktIvH-LC6Pwrp0ShC7NbjH5AqoySf8s" debounce={300} components="country:usa">
                        {({ inputValue, handleTextChange, locationResults, fetchDetails, clearSearch }) => (
                            <View style={styles.toWrapper}>
                                <React.Fragment>
                                    {setToResults(locationResults)}
                                    <TextInput style={{
                                        width: 300,
                                        paddingLeft: 40
                                    }}
                                        editable={true}
                                        defaultValue={toLocation}
                                        onFocus={() => { setFocusedThing(2) }}
                                        value={inputValue} // value={toLocation} < --- this needs to work somehow!
                                        onChangeText={handleTextChange}
                                        placeholder="Where are you going?"
                                    />
                                    <Button title="Clear" onPress={clearSearch}></Button>
                                </React.Fragment>
                            </View>
                        )}
                    </GoogleAutoComplete>
                </React.Fragment>
            </Surface>
            <ScrollView style={{ maxHeight: 200, paddingLeft: '10%' }}>
                {focusedThing === 1 ?
                    fromResults.map((el, i) => (
                        <FromLocationItem
                            {...el}
                            key={el.id}
                            updateFromState={updateFromState}
                            updateFromLocation={updateFromLocation}
                        >
                        </FromLocationItem>
                    )) :
                    toResults.map((el, i) => (
                        <ToLocationItem
                            {...el}
                            key={el.id}
                            updateToState={updateToState}
                            updateToLocation={updateToLocation}
                        >
                        </ToLocationItem>
                    ))
                }
            </ScrollView>
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
        width: 450,
        maxHeight: 200,
        paddingVertical: 0,
        alignContent: 'center',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
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
    fromInput: {
        width: '70%',
        marginLeft: '30%',
        marginVertical: 0
    },
    fromButton: {
        width: '25%',
        marginVertical: 0
    },
    toWrapper: {
        flex: 1,
        width: 325,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center'
    },
    toInput: {
        width: '70%',
        marginLeft: '30%',
        marginVertical: 0
    },
    toButton: {
        width: '20%',
        marginVertical: 0
    },
    destinations: {
        flex: 1,
        width: 400,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1.5
    },
    back: {
        flex: 1,
        width: 400,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    }
});

const mapDispatchToProps = {
    navigate: navigate,
    updateToLocation: updateToLocation,
    updateFromLocation: updateFromLocation
}

export default connect(null, mapDispatchToProps)(LocationForm);