import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../../redux/actions';
import { View, Text, StyleSheet } from 'react-native';
import TextInput from '../../../components/TextInput.js'
import Button from '../../../components/Button.js'

const LocationForm = props => {
    return (
        <View>
            <TextInput style={styles.inputTo} label='To:'/>
            <TextInput style={styles.inputFrom} label='From:'/>
            <TextInput style={styles.inputTime} label='Date:'/>
            <Button style={styles.confirmButton}>Confirm</Button>
            <Button style={styles.backButton}>Back</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    inputTo: {
        width: '300%',
        alignSelf: 'center'
    },
    inputFrom: {
        width: '300%',
        alignSelf: 'center'
    },
    inputTime: {
        width: '300%',
        alignSelf: 'center',
        marginBottom: '275%'
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