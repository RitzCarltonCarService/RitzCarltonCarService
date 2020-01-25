import { connect } from 'react-redux';
import React, { useState, memo } from 'react';
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
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <View>
                <Surface style={styles.surface}>
                    <React.Fragment>
                        <GoogleAutoComplete apiKey={props.apiKey} debounce={300} components="country:usa">
                            {({ inputValue, handleTextChange, locationResults, clearSearch }) => (
                                <View style={styles.fromWrapper}>
                                    {setFromFunc(clearSearch)}
                                    {setFromResults(locationResults)}
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
                                                editable={true}
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
                            {({ inputValue, handleTextChange, locationResults, clearSearch }) => (
                                <View style={styles.toWrapper}>
                                    {setToFunc(clearSearch)}
                                    {setToResults(locationResults)}
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
                                                onFocus={() => {setFocusedThing(2)}}
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
                                    updateFromLocation={updateFromLocation}
                                    setFromValue={setFromValue}
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
                                    updateToLocation={updateToLocation}
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

const mapDispatchToProps = {
    navigate: navigate,
    updateToLocation: updateToLocation,
    updateFromLocation: updateFromLocation
}

export default connect(null, mapDispatchToProps)(memo(LocationMapView));