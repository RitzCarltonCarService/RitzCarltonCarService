import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../../redux/actions';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import TextInput from '../../../components/TextInput.js'
import Button from '../../../components/Button.js'
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import LocationItem from './LocationItem';

const LocationForm = props => {
    // MAKE SURE TO REMOVE GOOGLE MAPS API KEY BEFORE PUSHING TO GIT HUB!!!!!!!!
    // Making a random change to test .gitignore
    return (
        <>
            <GoogleAutoComplete apiKey={"AIzaSyBpktIvH-LC6Pwrp0ShC7NbjH5AqoySf8s"} debounce={500}>
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
            <GoogleAutoComplete apiKey={"AIzaSyBpktIvH-LC6Pwrp0ShC7NbjH5AqoySf8s"} debounce={500}>
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