import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../../redux/actions';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import TextInput from '../../../components/TextInput.js'
import Button from '../../../components/Button.js'
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import LocationItem from './LocationItem';

const LocationForm = props => {
    // MAKE SURE TO REMOVE GOOGLE MAPS API KEY BEFORE PUSHING TO GIT HUB!!!!!!!!
    return (
        <>
            <GoogleAutoComplete apiKey={"Add here!"} debounce={500}>
                {({ handleTextChange, locationResults }) => (
                    <React.Fragment>
                        {console.log('locationResults:', locationResults)}
                        <View style={styles.inputTo}>
                            <TextInput
                                style={styles.inputTo}
                                placeholder="Current Location"
                                onChangeText={handleTextChange}
                            />
                        </View>
                        <ScrollView>
                            {locationResults.map(el => (
                                <LocationItem
                                    {...el}
                                    key={el.id}
                                />
                            ))}
                        </ScrollView>
                    </React.Fragment>
                )}
            </GoogleAutoComplete>
            <TextInput style={styles.inputTime} label='Date:'/>
            <Button
                style={styles.confirmButton}
                onPress={() => {props.setForm(1);}}
            >
                Confirm
            </Button>
            <Button style={styles.backButton}>Back</Button>
        </>
    )
}

const styles = StyleSheet.create({
    inputTo: {
        marginTop: '2%',
        width: 300,
        alignSelf: 'center'
    },
    inputFrom: {
        width: '300%',
        alignSelf: 'center'
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