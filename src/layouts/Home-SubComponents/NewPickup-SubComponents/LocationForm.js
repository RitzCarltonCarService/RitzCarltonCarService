import { connect } from 'react-redux';
import { navigate } from '../../../redux/actions';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState, useEffect } from 'react';
import TextInput from '../../../components/TextInput.js'
import Button from '../../../components/Button.js'
import LocationItem from './LocationItem';

const LocationForm = props => {
    // MAKE SURE TO REMOVE GOOGLE MAPS API KEY BEFORE PUSHING TO GIT HUB!!!!!!!!
    // Making a random change to test .gitignore

    // Conditional rendering of DateTimePicker based on if toLocation and fromLocation both exist
    // Update mapBackground with input of toLocation
    // Once input of fromLocation, store fromLocation in Redux store, map over all coordinates and
    //  update map background: https://stackoverflow.com/questions/40541095/render-multiple-marker-in-react-native-maps
    // Store fromLocation, toLocation, Date in Redux store to be passed into database

    // Hooks for storing 'toLocation', 'fromLocation' and 'Date'
    const [date, setDate] = useState({ date: new Date(), mode: 'date', show: false });
    const [toLocation, setTo] = useState('');
    // pass down Redux currect location as initial state for 'setFrom' ???
    const [fromLocation, setFrom] = useState('');

    // useEffect((event, date) => {
    //     date = date;
    // })
    
    //   setDate = (event, date) => {
    //     date = date || this.state.date;
    
    //     this.setState({
    //       show: Platform.OS === 'ios' ? true : false,
    //       date,
    //     });
    //   }
    
    //   show = mode => {
    //     this.setState({
    //       show: true,
    //       mode,
    //     });
    //   }
    
    //   datepicker = () => {
    //     this.show('date');
    //   }
    
    //   timepicker = () => {
    //     this.show('time');
    //   }

    return (
        <>
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
                                placeholder="Current Location"
                                onChangeText={handleTextChange}
                                value={inputValue}
                            />
                            <Button title="Confirm" onPress={() => { clearSearch(); setTo(inputValue); }} />
                            <Button title="Clear" onPress={clearSearch} />
                        </View>
                        {isSearching && <ActivityIndicator size="large" color="red" />}
                        <ScrollView>
                            {locationResults.map(el => (
                                <LocationItem
                                    {...el}
                                    key={el.id}
                                    fetchDetails={fetchDetails}
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
                                placeholder="To:"
                                onChangeText={handleTextChange}
                                value={inputValue}
                            />
                            <Button title="Confirm" onPress={() => { clearSearch(); setFrom(inputValue); }} />
                            <Button title="Clear" onPress={clearSearch} />
                        </View>
                        {isSearching && <ActivityIndicator size="large" color="red" />}
                        <ScrollView>
                            {locationResults.map(el => (
                                <LocationItem
                                    {...el}
                                    key={el.id}
                                    fetchDetails={fetchDetails}
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
    navigate: navigate
}

export default connect(null, mapDispatchToProps)(LocationForm);