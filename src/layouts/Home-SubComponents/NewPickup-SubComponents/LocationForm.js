import { connect } from 'react-redux';
import { navigate, updateToLocation, updateFromLocation, updateTravelDate  } from '../../../redux/actions';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import React, { useState, useEffect } from 'react';
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
    const [fromSelected, selectFrom] = useState(false);
    const [toSelected, selectTo] = useState(false);

    updateFromState = (fromItem) => {
        setFrom(fromItem);
    }

    updateToState = (toItem) => {
        setTo(toItem)
    }
    
    // pass fromLocation to redux store and use to display an updated Map background based on from coordinates
    useEffect(() => {
        console.log("This is the current fromLocation: ", fromLocation)
      }, [fromLocation]); // Only re-run the effect if count changes

    // pass fromLocation to redux store and use to display an updated Map background based on to coordinates
    useEffect(() => {
        console.log("This is the current ToLocation: ", toLocation)
    }, [toLocation]); // Only re-run the effect if count changes


    return (
        <View style={styles.container}>
            <View style={styles.fromWrapper}>
                <GoogleAutoComplete apiKey={"AIzaSyBpktIvH-LC6Pwrp0ShC7NbjH5AqoySf8s"} debounce={500} components={"country:usa"}>
                    {({ handleTextChange, 
                        locationResults, 
                        fetchDetails, 
                        isSearching,
                        inputValue,
                        clearSearch
                        }) => (
                        <React.Fragment>
                            {console.log('locationResults:', locationResults[0])}
                            <View>
                                <TextInput style={styles.textInput}
                                    placeholder={fromLocation}
                                    onChangeText={handleTextChange}
                                    value={inputValue}
                                />
                            </View>
                            <Button title="Clear" style={styles.clearButton} onPress={clearSearch}>Clear</Button>
                            {isSearching && <ActivityIndicator size="large" color="purple" />}
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
            </View>
            <View style={styles.toWrapper}>
                <GoogleAutoComplete apiKey={"AIzaSyBpktIvH-LC6Pwrp0ShC7NbjH5AqoySf8s"} debounce={500} components={"country:usa"}>
                    {({ handleTextChange, 
                        locationResults, 
                        fetchDetails, 
                        isSearching,
                        inputValue,
                        clearSearch
                        }) => (
                        <React.Fragment>
                            {console.log('locationResults:', locationResults[0])}
                            <View>
                                <TextInput style={styles.textInput}
                                    placeholder={toLocation}
                                    onChangeText={handleTextChange}
                                    value={inputValue}
                                />
                            </View>
                            <Button title="Clear" style={styles.clearButton} onPress={clearSearch}>Clear</Button>
                            {isSearching && <ActivityIndicator size="large" color="purple" />}
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
            </View>
            <View style={styles.nextButton}>
                <Button>Select a Date & Time</Button>
            </View>
            <View style={styles.backButton}>
                <Button>Back</Button>
            </View>
        </View>
    )
}

/* 

return (
      <View style={{
        flex: 1,
        width: 500,
        height: 500,
        alignItems: 'center',
        paddingVertical: 0,
        paddingRight: 0,
      }}>
        <View style={{
          flex: 1,
          width: 500,
          height: 150,
          justifyContent: 'center',
          alignContent: 'flex-end',
          marginTop: 0,
          borderTopWidth: '',
        }}>
          <View style={{
            flex: 1,
            width: 400,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }} />
          <View style={{
            flex: 1,
            width: 400,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }} />
        </View>
        <View style={{
          flex: 1,
          width: 400,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 300,
        }} />
      </View>
    );

*/



const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 500,
        height: 500,
        alignItems: 'center',
        padding: 20
    },
    fromWrapper: {
        flex: 1,
        width: '100%',
        height: 40,
        marginLeft: '20%',
        alignItems: 'center',
        flexDirection: 'row'
    },
    toWrapper: {
        flex: 1,
        width: '100%',
        marginLeft: '20%',
        height: 40,
        alignItems: 'center',
        flexDirection: 'row'
    },
    textInput: {
        width: '80%'
    },
    clearButton: {
        width: '5%'
    },
    nextButton: {
        flex: 1,
        width: 400,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 300
    },
    backButton: {
        flex: 1,
        width: 400,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapDispatchToProps = {
    navigate: navigate,
    updateToLocation: updateToLocation,
    updateFromLocation: updateFromLocation
}

export default connect(null, mapDispatchToProps)(LocationForm);