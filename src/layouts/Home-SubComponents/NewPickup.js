import React, { useState } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../redux/actions';
import { View, Text, Button } from 'react-native';
import LocationForm from './NewPickup-SubComponents/LocationForm.js';
import NumBags from './NewPickup-SubComponents/NumBags.js';
import NumPassengers from './NewPickup-SubComponents/NumPassengers.js';
import RideShareQuestion from './NewPickup-SubComponents/RideShareQuestion.js';
import SummaryScreen from './NewPickup-SubComponents/SummaryScreen.js';

const NewPickup = props => {
    const [form, setForm] = useState(0)

    switch (form) {
        case 0:
            return (
                <View>
                    <LocationForm setForm={setForm} />
                </View>
            )
        case 1:
            return (
                <View>
                    <NumBags setForm={setForm} />
                </View>
            )
        case 2:
            return (
                <View>
                    <NumPassengers setForm={setForm} />
                </View>
            )
        case 3:
            return (
                <View>
                    <RideShareQuestion setForm={setForm} />
                </View>
            )
        case 4:
            return (
                <View>
                    <SummaryScreen setPage={props.setPage} />
                    <Text>
                        {props.setPage}
                    </Text>
                </View>
            )
        default:
            return (
                <View>
                    <Text>
                        Uh-oh. Something went wrong.
                    </Text>
                    <Text>
                        Form: {form}
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