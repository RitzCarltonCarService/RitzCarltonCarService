import { connect } from 'react-redux';
import React, { useState, memo, useEffect } from 'react';
import { navigate, updateToLocation, updateFromLocation } from '../../../../redux/actions';
import { Text, View, StyleSheet, ScrollView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import {Surface} from "react-native-paper";
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import { theme } from "../../../../core/theme.js";
import useFunctionAsState from '../../../../components/UseFunctionAsState.js'
import TextInput from '../../../../components/TextInput.js'
import FromLocationItem from './FromLocationItem';
import ToLocationItem from './ToLocationItem';

const LocationMapView = ({ updateToLocation, updateFromLocation, ...props }) => {
    // Hook to allow for saving of inputValue in From/To TextInput fields
    const [newFromInputValue, changeFromInput] = useState(false);
    const [newToInputValue, changeToInput] = useState(false);
    
    // Store a function to be executed somewhere else
    const [fromFunc, setFromFunc] = useFunctionAsState(null);
    const [toFunc, setToFunc] = useFunctionAsState(null);

    // Initial state of from and to Results
    const [fromResults, setFromResults] = useState([]);
    const [toResults, setToResults] = useState([]);

    // New To and From results
    const [newFromResults, setNewFromResults] = useState([]);
    const [newToResults, setNewToResults] = useState([]);

     // Boolean hooks will prevent the initial states above from being displayed before user clicks inside text input 
     const [fromLoaded, setFromLoaded] = useState(false);
     const [toLoaded, setToLoaded] = useState(false);

    // Initial states of Text Input for To/From 
    const [focusedThing, setFocusedThing] = useState(false);

    // This useEffect looks for changes in the Location results from search From destinations
    useEffect(() => {
        // Hard-coding the Ritz-Carlton Residences coordinates into the toLocation results
        const ritzCarltonResidencesPhila = {
            id: 1,
            description: 'The Ritz-Carlton Residences',
            place_id: 'ChIJO6U0ty_GxokRRF3bnNL5wPQ'
        }

        // Hard-coding the Philadelphia Airport coordinates into the toLocation results
        const philadelphiaAirport = {
            id: 2,
            description: 'Philadelphia International Airport',
            place_id: 'ChIJ88WCT2bExokRS1MKpnC8pfw'
        }

        // console.log("These are the results for From Destinations: ", newFromResults)
        let tempFromResults = newFromResults;
        tempFromResults.unshift(ritzCarltonResidencesPhila, philadelphiaAirport)
        // console.log("This is the temp fromResults array: ", tempFromResults)
        setFromResults(tempFromResults);  
        // console.log("These are the toResults state: ", fromResults)
    }, [newFromResults]);

    // This useEffect looks for changes in the Location results from search To destinations
    useEffect(() => {
        // Hard-coding the Ritz-Carlton Residences coordinates into the toLocation results
        const ritzCarltonResidencesPhila = {
            id: 1,
            description: 'The Ritz-Carlton Residences',
            place_id: 'ChIJO6U0ty_GxokRRF3bnNL5wPQ'
        }

        // Hard-coding the Philadelphia Airport coordinates into the toLocation results
        const philadelphiaAirport = {
            id: 2,
            description: 'Philadelphia International Airport',
            place_id: 'ChIJ88WCT2bExokRS1MKpnC8pfw'
        }

        // console.log("These are the results for To Destinations: ", newToResults)
        let tempToResults = newToResults;
        tempToResults.unshift(ritzCarltonResidencesPhila, philadelphiaAirport)
        // console.log("This is the temp toResults array: ", tempToResults)
        setToResults(tempToResults)  
        // console.log("These are the toResults state: ", toResults)
    }, [newToResults]);

    // Resets focus of From text input to display selected address via from-location drop down menu
    const setFromValue = () => {
        changeFromInput(false)
    }

    // Resets focus of To text input to display selected address via to-location drop down menu
    const setToValue = () => {
        changeToInput(false)
    }

    // Clears the suggested drop down items for From destination suggestions
    const clearFromValues = () => {
        setFromLoaded(false);
    }

    // Clears the suggested drop down items for To destination suggestions
    const clearToValues = () => {
        setToLoaded(false);
    }

    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <View>
                <Surface style={styles.surface}>
                    <React.Fragment>
                        <GoogleAutoComplete apiKey={props.apiKey} debounce={300} components="country:usa">
                            {({ inputValue, handleTextChange, locationResults, clearSearch }) => (
                                <View style={styles.fromWrapper}>
                                    {setFromFunc(clearSearch)}
                                    {setNewFromResults(locationResults)}
                                    {props.newFromLocation === false &&
                                        <React.Fragment>
                                            <TextInput style={{
                                                width: 300,
                                                paddingLeft: '6%',
                                                }}
                                                label="From:"
                                                editable={true}
                                                value={'Current Location'}
                                                onFocus={() => props.changeFrom(true)}
                                                clearTextOnFocus={true}
                                            />
                                        </React.Fragment>
                                    }
                                    {props.newFromLocation === true && newFromInputValue === false &&
                                        <React.Fragment>
                                            <TextInput style={{
                                                width: 300,
                                                paddingLeft: '6%' 
                                                }}
                                                label="From:"
                                                defaultValue={inputValue}
                                                value={props.fromLocation}
                                                onFocus={() => {setFocusedThing(1)}}
                                                onChangeText={() => changeFromInput(true)} 
                                                autoFocus={true}
                                            />
                                        </React.Fragment>
                                    }
                                    {props.newFromLocation === true && newFromInputValue === true &&
                                        <React.Fragment>
                                            <TextInput style={{
                                                width: 300,
                                                paddingLeft: '6%' 
                                                }}
                                                label="From:"
                                                editable={true}
                                                defaultValue={inputValue}
                                                value={inputValue}
                                                autoFocus={true}
                                                onFocus={() => setFocusedThing(1)}
                                                onChange={() => {
                                                    setToLoaded(false);
                                                    setFromLoaded(true);
                                                }}
                                                onChangeText={handleTextChange}
                                            />
                                        </React.Fragment>
                                    }
                                </View>
                            )}
                        </GoogleAutoComplete>
                        <GoogleAutoComplete apiKey={props.apiKey} debounce={300} components="country:usa">
                            {({ inputValue, handleTextChange, locationResults, clearSearch }) => (
                                <View style={styles.toWrapper}>
                                    {setToFunc(clearSearch)}
                                    {setNewToResults(locationResults)}
                                    {newToInputValue === false &&
                                        <React.Fragment>
                                            <TextInput style={{
                                                width: 300,
                                                paddingLeft: '6%' 
                                                }}
                                                label="To:"
                                                placeholder="Where are you going??"
                                                onChangeText={() => changeToInput(true)}
                                                editable={true}
                                                defaultValue={inputValue}
                                                value={props.toLocation}
                                                onFocus={() => {
                                                    setFocusedThing(2);
                                                }}
                                            />
                                        </React.Fragment>
                                    }
                                    {newToInputValue === true &&
                                        <React.Fragment>
                                            <TextInput style={{
                                                width: 300,
                                                paddingLeft: '6%' 
                                                }}
                                                label="To:"
                                                placeholder="Where are you going?"
                                                editable={true}
                                                // autoFocus={true}
                                                defaultValue={inputValue}
                                                value={inputValue}
                                                onFocus={() => setFocusedThing(2)}
                                                onChange={() => {
                                                    setToLoaded(true);
                                                    setFromLoaded(false);
                                                }}
                                                onChangeText={handleTextChange}                                 
                                            />
                                        </React.Fragment>
                                    }
                                </View>
                            )}
                        </GoogleAutoComplete>
                    </React.Fragment>
                </Surface>
                <View style={styles.scroll}>
                    <ScrollView style={styles.scrollView} 
                        keyboardShouldPersistTaps={'always'} 
                        keyboardDismissMode='on-drag'>
                        {focusedThing === 1 && fromLoaded &&
                            fromResults.map((el, i) => (
                                <FromLocationItem
                                    {...el}
                                    key={i}
                                    googAPI={props.apiKey}
                                    clearFromSelections={fromFunc}
                                    updateFromState={props.updateFromState}
                                    updateFromLocation={updateFromLocation}
                                    clearFromValues={clearFromValues}
                                    setFromValue={setFromValue}
                                >
                                </FromLocationItem>
                            ))
                         }
                         {focusedThing === 2 && toLoaded &&
                            toResults.map((el, i) => (
                                <ToLocationItem
                                    {...el}
                                    key={i}
                                    googAPI={props.apiKey}
                                    clearToSelections={toFunc}
                                    updateToState={props.updateToState}
                                    updateToLocation={updateToLocation}
                                    clearToValues={clearToValues}
                                    setToValue={setToValue}
                                >
                                </ToLocationItem>
                            ))
                         }
                    </ScrollView>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}        

const styles = StyleSheet.create({
    surface: {
        width: '200%',
        alignContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        top: '5%'
    },
    scroll: {
        height: '50%'
    }
});

const mapStateToProps = state => {
    // console.log("This is the state in LocationMapView: ", state)
    return {
        geoLocation: state.geoLocation,
        userData: state.userData
    }
}

const mapDispatchToProps = {
    navigate: navigate,
    updateToLocation: updateToLocation,
    updateFromLocation: updateFromLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(LocationMapView));