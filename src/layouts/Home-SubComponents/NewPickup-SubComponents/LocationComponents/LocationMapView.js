import { connect } from 'react-redux';
import React, { useState } from 'react';
import { navigate, updateToLocation, updateFromLocation } from '../../../../redux/actions';
import { Text, View, StyleSheet, ScrollView, Keyboard, Alert } from 'react-native';
import {Surface} from "react-native-paper";
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import { theme } from "../../../../core/theme.js";
import useFunctionAsState from '../../../../components/UseFunctionAsState.js'
import TextInput from '../../../../components/TextInput.js'
import FromLocationItem from './FromLocationItem';
import ToLocationItem from './ToLocationItem';

const LocationMapView = props => {
    // Hook to allow for saving of inputValue in From/To TextInput fields
    const [newFromInputValue, changeFromInput] = useState(false);
    const [newToInputValue, changeToInput] = useState(false);
    
    // Store a function to be executed somewhere else
    const [fromFunc, setFromFunc] = useFunctionAsState(null);
    const [toFunc, setToFunc] = useFunctionAsState(null);

    // Initial state of From/To destination results
    const [fromResults, setFromResults] = useState([]);
    const [toResults, setToResults] = useState([]);

    // Initial states of Text Input for To/From 
    const [focusedThing, setFocusedThing] = useState(false);

    // Resets focus of From text input to display selected address via from-location drop down menu
    const setFromValue = () => {
        changeFromInput(false)
    }

    // Resets focus of To text input to display selected address via to-location drop down menu
    const setToValue = () => {
        changeToInput(false)
    }

    return (
        <View>
            <Surface style={styles.surface}>
                <React.Fragment>
                    <GoogleAutoComplete apiKey={props.apiKey} debounce={300} components="country:usa">
                        {({ inputValue, handleTextChange, locationResults, fetchDetails, clearSearch }) => (
                            <View style={styles.fromWrapper}>
                                {setFromFunc(clearSearch)}
                                {setFromResults(locationResults)}
                                {props.newFromLocation === false &&
                                    <React.Fragment>
                                        <TextInput style={{
                                            width: 300,
                                            paddingLeft: 40 
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
                                            paddingLeft: 40 
                                            }}
                                            label="From:"
                                            editable={true}
                                            defaultValue={inputValue}
                                            value={props.fromLocation}
                                            onFocus={() => {setFocusedThing(1)}}
                                            onChangeText={() => changeFromInput(true)} // < -- pass this down!!!!
                                            autoFocus={true}
                                        />
                                    </React.Fragment>
                                }
                                {props.newFromLocation === true && newFromInputValue === true &&
                                    <React.Fragment>
                                        <TextInput style={{
                                            width: 300,
                                            paddingLeft: 40 
                                            }}
                                            label="From:"
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
                    <GoogleAutoComplete apiKey={props.apiKey} debounce={300} components="country:usa">
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
                                            label="To:"
                                            placeholder="Where are you going?"
                                            editable={true}
                                            defaultValue={inputValue}
                                            value={props.toLocation}
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
                                            label="To:"
                                            editable={true}
                                            autoFocus={true}
                                            defaultValue={inputValue}
                                            value={inputValue}
                                            onFocus={() => {setFocusedThing(2)}}
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
                    {focusedThing === 1 ?
                        fromResults.map((el, i) => (
                            <FromLocationItem
                                {...el}
                                key={el.id}
                                googAPI={props.apiKey}
                                clearFromSelections={fromFunc}
                                updateFromState={props.updateFromState}
                                updateFromLocation={props.updateFromLocation}
                                setFromValue={props.setFromValue}
                            >
                            </FromLocationItem>
                        )) :
                        toResults.map((el, i) => (
                            <ToLocationItem
                                {...el}
                                key={el.id}
                                googAPI={props.apiKey}
                                clearToSelections={toFunc}
                                updateToState={props.updateToState}
                                updateToLocation={props.updateToLocation}
                                setToValue={props.setToValue}
                            >
                            </ToLocationItem>
                        ))
                    }
                </ScrollView>
            </View>
        </View>
    )
}        

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    surface: {
        flex: 1,
        width: '200%',
        marginTop: '7%',
        maxHeight: '30%',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    fromWrapper: {
        flex: 1,
        width: 325,
        height: '5%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    toWrapper: {
        flex: 1,
        width: 325,
        height: '5%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    scroll: {
        flex: 1,
        width: '100%',
        maxHeight: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    scrollView: {
        height: '50%',
        width: '100%',
        marginHorizontal: '10%',
        maxHeight: '100%',
    },
    buttonContainer: {
        flex: 1,
        maxHeight: '100%',
        width: "100%",
        flexDirection: 'column',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        justifyContent: 'center',
        marginBottom: '10%'
    },
    singleRideButtonContainer: {
        flex: 1,
        maxHeight: '100%',
        width: "100%",
        flexDirection: 'column',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        justifyContent: 'center',
        marginBottom: '10%'
    },
    backButton: {
        maxHeight: "100%",
        width: "100%",
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
        borderRadius: 10
    },
    nextButton: {
        maxHeight: "100%",
        width: "100%",
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

export default connect(mapStateToProps, mapDispatchToProps)(LocationMapView);