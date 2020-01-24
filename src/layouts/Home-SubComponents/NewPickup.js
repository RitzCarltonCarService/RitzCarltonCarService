import React, { useState } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../redux/actions';
import { View, Text, Button } from 'react-native';
import LocationForm from './NewPickup-SubComponents/LocationComponents/LocationForm.js';
import NumBags from './NewPickup-SubComponents/NumBags.js';
import NumPassengers from './NewPickup-SubComponents/NumPassengers.js';
import RideShareQuestion from './NewPickup-SubComponents/RideShareQuestion.js';
import SummaryScreen from './NewPickup-SubComponents/SummaryScreen.js';

const NewPickup = props => {
    const [form, setForm] = useState(0)
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [time, setTime] = useState(null);
    const [passengers, setPassengers] = useState(null);
    const [bags, setBags] = useState(null);
    const [rideShare, setRideShare] = useState(true);
    // Hook to use different From location for rerendering purposes
    const [immediateLocation, changeFrom] = useState(false);

    switch (form) {
        case 0:
            return (
                <View>
                    <LocationForm 
                        scheduled={props.scheduled}
                        setPage={props.setPage}
                        setForm={setForm} 
                        setFrom={setFrom} 
                        setTo={setTo} 
                        setTime={setTime}
                        changeFrom={changeFrom}    
                    />
                </View>
            )
        case 1:
            return (
                <View>
                    <NumBags setForm={setForm} setBags={setBags}/>
                </View>
            )
        case 2:
            return (
                <View>
                    <NumPassengers setForm={setForm} setPassengers={setPassengers}/>
                </View>
            )
        case 3:
            return (
                <View>
                    <SummaryScreen
                        passengers={passengers}
                        bags={bags}
                        setForm={setForm}
                        setPage={props.setPage}
                        immediateLocation={immediateLocation}
                        requestObject={{
                            from: from,
                            to: to,
                            time: time,
                            duration: props.duration,
                            distance: props.distance,
                            bags: bags,
                            passengers: passengers,
                            rideShare: rideShare,
                            userData: props.userData,
                            fromCoordinates: props.fromLocation,
                            toCoordinates: props.toLocation
                        }}
                    />
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
        form: state.nav.form,
        duration: state.duration,
        distance: state.distance,
        userData: state.userData,
        fromLocation: state.fromLocation,
        toLocation: state.toLocation
    }
}

export default connect(mapStateToProps, {})(NewPickup);