import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { navigate, updateToLocation, updateFromLocation } from '../../../redux/actions';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { Button as RegButton } from "react-native-paper";
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
// import { Button as PaperButton } from "react-native-paper";
import {Surface} from "react-native-paper";
import TextInput from '../../../components/TextInput.js'
import FromLocationItem from './FromLocationItem';
import ToLocationItem from './ToLocationItem';
import { theme } from "../../../core/theme.js";

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
    
    // Rendering of DateTimePicker on Click of Next to select date and time

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

    return (
        <View styles={styles.container}>
            <Surface style={styles.surface}>
                <React.Fragment>
                    <GoogleAutoComplete apiKey="" debounce={300} components="country:usa">
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
                                        onFocus={() => {setFocusedThing(1)}}
                                        onChangeText={handleTextChange}
                                        placeholder="Current Location..."
                                    />
                                    <RegButton title="Clear" onPress={() => {clearSearch}}></RegButton>
                                </React.Fragment>
                            </View>
                        )}
                    </GoogleAutoComplete>
                    <GoogleAutoComplete apiKey="" debounce={300} components="country:usa">
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
                                        onFocus={() => {setFocusedThing(2)}}
                                        value={inputValue} // value={toLocation} < --- this needs to work somehow!
                                        onChangeText={handleTextChange}
                                        placeholder="Where are you going?"
                                    />
                                    <RegButton title="Clear" onPress={clearSearch}></RegButton>
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
            <View style={styles.buttonContainer}>
                {fromLocation && toLocation ? 
                    <>
                    <RegButton 
                        style={[
                            styles.nextButton,
                            { backgroundColor: theme.colors.surface }
                        ]}
                        title="Next" mode="outlined" onPress={() => console.log('Pressed')}>
                    </RegButton>
                    <RegButton 
                        style={[
                            styles.backButton,
                            { backgroundColor: theme.colors.surface }
                        ]}
                        title="Back" mode="outlined" onPress={() => console.log('Pressed')}>
                    </RegButton>
                    </>
                    : 
                    <RegButton 
                        style={[
                            styles.backOnlyButton,
                            { backgroundColor: theme.colors.surface }
                        ]}
                        title="Back" mode="outlined" onPress={() => console.log('Pressed')}>
                    </RegButton>
                }
            </View>   
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
        top: '40%',
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

const mapDispatchToProps = {
    navigate: navigate,
    updateToLocation: updateToLocation,
    updateFromLocation: updateFromLocation
}

export default connect(null, mapDispatchToProps)(LocationForm);