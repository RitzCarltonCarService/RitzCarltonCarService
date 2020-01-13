import { connect } from 'react-redux';
import { navigate, updateToLocation, updateFromLocation, updateTravelDate  } from '../../../redux/actions';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState, useEffect } from 'react';
import TextInput from '../../../components/TextInput.js'
import Button from '../../../components/Button.js'
import FromLocationItem from './FromLocationItem';
import ToLocationItem from './ToLocationItem';

// Exporting contexts to LocationItem component as state and setState with React Hooks
export const FromContext = React.createContext();
export const ToContext = React.createContext();
export const DateContext = React.createContext()

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

    // Hooks for storing 'toLocation', 'fromLocation' and 'Date'
    const [date, setDate] = useState({ date: new Date(), mode: 'date', show: false });
    const [fromLocation, setFrom] = useState('Current Location');
    const [toLocation, setTo] = useState('');

    updateFromState = (fromItem) => {
        setFrom(fromItem);
    }

    updateToState = (toItem) => {
        setTo(toItem)
    }
    
    useEffect(() => {
        console.log("This is the current fromLocation: ", fromLocation)
      }, [fromLocation]); // Only re-run the effect if count changes

    useEffect(() => {
        console.log("This is the current ToLocation: ", toLocation)
    }, [toLocation]); // Only re-run the effect if count changes
      
    // https://github.com/react-native-community/react-native-datetimepicker#react-native-datetimepicker
    // Render Date/Time Picker if there are confirmed dates in From/To Locations  
    // useEffect(() => {
    //     if (toLocation !== '') {
            
    //     }
    // });

    return (
        <>
            <GoogleAutoComplete apiKey={""} debounce={500} components={"country:usa"}>
                {({ handleTextChange, 
                    locationResults, 
                    fetchDetails, 
                    isSearching,
                    inputValue,
                    clearSearch
                    }) => (
                    <React.Fragment>
                        {console.log('locationResults:', locationResults[0])}
                        <View style={styles.inputTo}>
                            <TextInput
                                style={styles.inputTo}
                                placeholder={fromLocation}
                                onChangeText={handleTextChange}
                                value={inputValue}
                            />
                            <Button title="Clear" onPress={clearSearch} />
                        </View>
                        {isSearching && <ActivityIndicator size="large" color="red" />}
                        <ScrollView>
                            {locationResults.map(el => (
                                    <FromLocationItem
                                        {...el}                                    
                                        key={el.id}
                                        fetchDetails={fetchDetails}
                                        clearSearch={clearSearch}
                                        updateFromState={updateFromState}
                                    />
                                ))}
                        </ScrollView>
                    </React.Fragment>
                )}
            </GoogleAutoComplete>
            <GoogleAutoComplete apiKey={""} debounce={500}>
                {({ handleTextChange, 
                    locationResults, 
                    fetchDetails, 
                    isSearching,
                    inputValue,
                    clearSearch
                    }) => (
                    <React.Fragment>
                        {console.log('locationResults:', locationResults[0])}
                        <View style={styles.inputTo}>
                            <TextInput
                                style={styles.inputTo}
                                placeholder={toLocation}
                                onChangeText={handleTextChange}
                                value={inputValue}
                            />
                            <Button title="Clear" onPress={clearSearch} />
                        </View>
                        {isSearching && <ActivityIndicator size="large" color="red" />}
                        <ScrollView>
                            {locationResults.map(el => (
                                    <ToLocationItem
                                        {...el}
                                        key={el.id}
                                        fetchDetails={fetchDetails}
                                        clearSearch={clearSearch}
                                        updateToState={updateToState}
                                    />
                                ))}
                        </ScrollView>
                    </React.Fragment>
                )}
            </GoogleAutoComplete>
        </>
    )
}

const styles = StyleSheet.create({
    inputTo: {
        marginTop: '2%',
        width: 300,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    inputFrom: {
        marginTop: '2%',
        width: 300,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    inputTime: {
        width: '300%',
        alignSelf: 'center',
        marginBottom: '200%'
    },
    confirmButton: {
        width: '300%',
        alignSelf: 'center'
    },
    backButton: {
        width: '300%',
        alignSelf: 'center'
    }
});

const mapDispatchToProps = {
    navigate: navigate,
    updateToLocation: updateToLocation,
    updateFromLocation: updateFromLocation, 
    updateTravelDate: updateTravelDate
}

export default connect(null, mapDispatchToProps)(LocationForm);