import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../redux/actions';
import { View, Text, Button } from 'react-native';
import LocationForm from './NewPickup-SubComponents/LocationForm.js';
import NumBags from './NewPickup-SubComponents/NumBags.js';
import NumPassengers from './NewPickup-SubComponents/NumPassengers.js';
import RideShareQuestion from './NewPickup-SubComponents/RideShareQuestion.js';
import SummaryScreen from './NewPickup-SubComponents/SummaryScreen.js';

const NewPickup = props => {
    switch (props.form) {
        case 0:
            return (
                <View>
                    <LocationForm />
                </View>
            )
        case 1:
            return (
                <View>
                    <NumBags />
                </View>
            )
        case 2:
            return (
                <View>
                    <NumPassengers />
                </View>
            )
        case 3:
            return (
                <View>
                    <RideShareQuestion />
                </View>
            )
        case 4:
            return (
                <View>
                    <SummaryScreen />
                </View>
            )
        default:
            return (
                <View>
                    <Text>
                        Uh-oh. Something went wrong.
                    </Text>
                    <Text>
                        Form: {props.form}
                    </Text>
                </View>
            )
    }
}

const mapStateToProps = state => {
    return {
        form: state.nav.form
    }
}

export default connect(mapStateToProps, {})(NewPickup);