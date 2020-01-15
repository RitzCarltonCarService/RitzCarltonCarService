import { connect } from 'react-redux';
import { navigate, updateToLocation, updateFromLocation, updateTravelDate  } from '../../../redux/actions';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import { Surface } from 'react-native-paper';
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
    let fromLocationsArr = [];
    let toLocationsArr = [];
    const [fromLocation, setFrom] = useState('Current Location');
    const [toLocation, setTo] = useState('Type in your desination here...');
    const [fromLocations, setFromLocations] = useState([]);
    const [toLocations, setToLocations] = useState([]);
    const [fromSelected, selectFrom] = useState(false);
    const [toSelected, selectTo] = useState(false);

    // Function to update the setFrom location for Map based on user's selection
    updateFromState = (fromItem) => {
        setFrom(fromItem);
    }

    // Function to update the setTo location for Map based on user's selection
    updateToState = (toItem) => {
        setTo(toItem)
    }

    // Trigger re-rendering based on change in fromLocations


    // pass fromLocation to redux store and use to display an updated Map background based on from coordinates
    // useEffect(() => {
    //     console.log("This is the current fromLocation: ", fromLocation)
    //   }, [fromLocation]); // Only re-run the effect if count changes

    // pass fromLocation to redux store and use to display an updated Map background based on to coordinates
    // useEffect(() => {
    //     console.log("This is the current ToLocation: ", toLocation)
    // }, [toLocation]); // Only re-run the effect if count changes

    // onChange of textInput, boolean value to determine what elements should be displayed in destinations component
    // map over locationResults, call fetch detail on each item and push into hook state, 
    //  then iterate over hook state, and based on boolean value, dispay To/From Components


    if (fromSelected) {
        return (
            <View style={styles.container}>
                <Surface style={styles.surface}>
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
                                        <TextInput 
                                            style={styles.fromInput}
                                            onChange={() => {selectFrom(true); selectTo(false)}}
                                            placeholder={fromLocation}
                                            onChangeText={handleTextChange}
                                            value={inputValue}
                                        />
                                        <Button style={styles.fromButton} onPress={clearSearch}>Clear</Button>
                                        {/* For API results, map over elements, and create new object, store description and functions */}
                                        {locationResults.map(element => {
                                            let fromResult = {
                                                description: element.description,
                                                fetchDetails: fetchDetails,
                                                clearSearch: clearSearch
                                            };
                                            fromLocationsArr.push(fromResult);
                                            console.log("This is the value of fromLocationsArr: ", fromLocationsArr)
                                        })}
                                        {/* {setFromLocations(fromLocationsArr)} */}
                                        {console.log("This is our hook from locations: ", fromLocations)}
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
                                            <TextInput
                                                style={styles.toInput}
                                                onChange={() => {selectTo(true); selectFrom(false)}}
                                                placeholder={toLocation}
                                                onChangeText={handleTextChange}
                                                value={inputValue}
                                            />
                                            <Button style={styles.toButton} onPress={clearSearch}>Clear</Button>
                                            {/* For API results, map over elements, and create new object, store description and functions */}
                                            {locationResults.map(element => {
                                                let toResult = {
                                                    description: element.description,
                                                    fetchDetails: fetchDetails,
                                                    clearSearch: clearSearch
                                                };
                                                toLocationsArr.push(toResult);
                                                console.log("This is the value of toLocationsArr: ", toLocationsArr)
                                            })}
                                        </React.Fragment>
                                    )}
                            </GoogleAutoComplete>
                    </View>
                </Surface>
                <View style={styles.destinations}>
                   <React.Fragment>
                    <ScrollView>
                        {/* If 'fromSelected' is true, then create ScrollView showing all 'Fromlocations' from search  */}
                        {fromLocations.map((el, index) => {
                            return (
                                <FromLocationItem
                                    {...el}
                                    updateFromState={updateFromState}
                                    key={index}
                                    fetchDetails={el.clearSearch}
                                    fetchDetails={el.fetchDetails}
                                />
                            )
                        })}
                    </ScrollView>
                   </React.Fragment>
                </View>
                <View style={styles.back}>
                    <Button>Back</Button> 
                </View>
            </View>
        )
    } else if (toSelected) {
        return (
            <View style={styles.container}>
                <Surface style={styles.surface}>
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
                                        <TextInput 
                                            style={styles.fromInput}
                                            onChange={() => {selectFrom(true); selectTo(false)}}
                                            placeholder={fromLocation}
                                            onChangeText={handleTextChange}
                                            value={inputValue}
                                        />
                                        <Button style={styles.fromButton} onPress={clearSearch}>Clear</Button>
                                        {/* For API results, map over elements, and create new object, store description and functions */}
                                        {locationResults.map(element => {
                                            let fromResult = {
                                                description: element.description,
                                                fetchDetails: fetchDetails,
                                                clearSearch: clearSearch
                                            };
                                            fromLocationsArr.push(fromResult);
                                            console.log("This is the value of fromLocationsArr: ", fromLocationsArr)
                                        })}
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
                                            <TextInput
                                                style={styles.toInput}
                                                onChange={() => {selectTo(true); selectFrom(false)}}
                                                placeholder={toLocation}
                                                onChangeText={handleTextChange}
                                                value={inputValue}
                                            />
                                            <Button style={styles.toButton} onPress={clearSearch}>Clear</Button>
                                            {/* For API results, map over elements, and create new object, store description and functions */}
                                            {locationResults.map(element => {
                                                let toResult = {
                                                    description: element.description,
                                                    fetchDetails: fetchDetails,
                                                    clearSearch: clearSearch
                                                };
                                                toLocationsArr.push(toResult);
                                                console.log("This is the value of toLocationsArr: ", toLocationsArr)
                                            })}
                                        </React.Fragment>
                                    )}
                            </GoogleAutoComplete>
                    </View>
                </Surface>
                <View style={styles.destinations}>
                   <React.Fragment>
                    <ScrollView>
                        {/* If 'toSelected' is true, then create ScrollView showing all 'ToLocations' from search  */}
                        {toLocations.map((el, index) => {
                            return (
                                <ToLocationItem
                                    {...el}
                                    updateFromState={updateFromState}
                                    key={index}
                                    fetchDetails={el.clearSearch}
                                    fetchDetails={el.fetchDetails}
                                />
                            )
                        })}
                    </ScrollView>
                   </React.Fragment>
                </View>
                <View style={styles.back}>
                    <Button>Back</Button> 
                </View>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <Surface style={styles.surface}>
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
                                        <TextInput 
                                            style={styles.fromInput}
                                            onChange={() => {selectFrom(true); selectTo(false)}}
                                            placeholder={fromLocation}
                                            onChangeText={handleTextChange}
                                            value={inputValue}
                                        />
                                        <Button style={styles.fromButton} onPress={clearSearch}>Clear</Button>
                                        {/* For API results, map over elements, and create new object, store description and functions */}
                                        {locationResults.map(element => {
                                            let fromResult = {
                                                description: element.description,
                                                fetchDetails: fetchDetails,
                                                clearSearch: clearSearch
                                            };
                                            fromLocationsArr.push(fromResult);
                                            console.log("This is the value of fromLocationsArr: ", fromLocationsArr)
                                        })}
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
                                            <TextInput
                                                style={styles.toInput}
                                                onChange={() => {selectTo(true); selectFrom(false)}}
                                                placeholder={toLocation}
                                                onChangeText={handleTextChange}
                                                value={inputValue}
                                            />
                                            <Button style={styles.toButton} onPress={clearSearch}>Clear</Button>
                                            {/* For API results, map over elements, and create new object, store description and functions */}
                                            {locationResults.map(element => {
                                                let toResult = {
                                                    description: element.description,
                                                    fetchDetails: fetchDetails,
                                                    clearSearch: clearSearch
                                                };
                                                toLocationsArr.push(toResult);
                                                console.log("This is the value of toLocationsArr: ", toLocationsArr)
                                            })}
                                        </React.Fragment>
                                    )}
                            </GoogleAutoComplete>
                    </View>
                </Surface>
                <View style={styles.destinations}>
                </View>
                <View style={styles.back}>
                    <Button>Back</Button> 
                </View>
            </View>
        )
    }
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