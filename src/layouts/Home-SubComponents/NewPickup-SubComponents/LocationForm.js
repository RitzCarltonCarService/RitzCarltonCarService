import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { navigate, updateToLocation, updateFromLocation } from '../../../redux/actions';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import { Surface } from 'react-native-paper';
import TextInput from '../../../components/TextInput.js'
import Button from '../../../components/Button.js'
import FromLocationItem from './FromLocationItem';
import ToLocationItem from './ToLocationItem';

const LocationForm = props => {
    // MAKE SURE TO REMOVE GOOGLE MAPS API KEY BEFORE PUSHING TO GIT HUB!!!!!!!!

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
    const [fromLocation, setFrom] = useState('Current Location');
    const [toLocation, setTo] = useState('Type in your desination here...');

    // Initial states of Text Input for To/From 
    const [focusedThing, setFocusedThing] = useState(false);
    
    // Initial state of From/To destination results
    const [fromResults, setFromResults] = useState([]);
    const [toResults, setToResults] = useState([]);

    // pass fromLocation to redux store and use to display an updated Map background based on from coordinates
    // useEffect(() => {
    //     console.log("This is the current fromLocation: ", fromLocation)
    //   }, [fromLocation]); // Only re-run the effect if count changes

    // pass fromLocation to redux store and use to display an updated Map background based on to coordinates
    // useEffect(() => {
    //     console.log("This is the current ToLocation: ", toLocation)
    // }, [toLocation]); // Only re-run the effect if count changes

    return (
        <React.Fragment>
            <GoogleAutoComplete apiKey="" debounce={300} components="country:usa">
                {({ inputValue, handleTextChange, locationResults, fetchDetails, clearSearch }) => (
                    <React.Fragment>
                        {setFromResults(locationResults)}
                        <TextInput style={{
                            height: 40,
                            width: 300,
                            borderWidth: 1,
                            paddingHorizontal: 16
                            }}
                            value={inputValue}
                            onFocus={() => {setFocusedThing(1)}}
                            onChangeText={handleTextChange}
                            placeholder="Current Location..."
                        />
                    </React.Fragment>
                )}
            </GoogleAutoComplete>
            <GoogleAutoComplete apiKey="" debounce={300} components="country:usa">
                {({ inputValue, handleTextChange, locationResults, fetchDetails, clearSearch }) => (
                    <React.Fragment>
                        {setToResults(locationResults)}
                        <TextInput style={{
                            height: 40,
                            width: 300,
                            borderWidth: 1,
                            paddingHorizontal: 16,
                            }}
                            onFocus={() => {setFocusedThing(2)}}
                            value={inputValue}
                            onChangeText={handleTextChange}
                            placeholder="Where are you going?"
                        />
                    </React.Fragment>
                )}
            </GoogleAutoComplete>
            <ScrollView style={{ maxHeight: 100, top: 200}}>
                {focusedThing === 1 ?
                    fromResults.map((el, i) => (
                        <Text key={i}>{el.description}</Text>
                    )) :
                    toResults.map((el, i) => (
                        <Text key={i}>{el.description}</Text>
                    ))
                }
            </ScrollView>
        </React.Fragment>
    )
}        

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 500,
        height: 500,
        alignItems: 'center'
    },
    surface: {
        flex: 1,
        width: 500,
        height: 150,
        alignContent: 'center'
    },
    fromWrapper: {
        flex: 1,
        width: 400,
        height: 40,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        display: 'flex'
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
        width: 400,
        height: 40,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        display: 'flex'
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