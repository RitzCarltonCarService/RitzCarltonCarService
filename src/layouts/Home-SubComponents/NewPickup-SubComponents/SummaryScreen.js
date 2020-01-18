import React from 'react';
import { connect } from 'react-redux';
import { updateScheduledPickups } from '../../../redux/actions';
import { View, Text } from 'react-native';
import Button from '../../../components/Button';
import dummyData from '../../../dummyData/dummy_pickup_data';
import { logoutUser } from '../../../core/auth-api';

const SummaryScreen = props => (
    <View>
        <Text>
            Form 4
            </Text>
<<<<<<< HEAD
            <Text>
                MORE STUFF
            </Text>
            <Text>
                MORE STUFF
            </Text>
            <Text>
                {props.requestObject.bags} bags {props.requestObject.passengers} passengers
            </Text>
            <Button
                title="Confirm"
                onPress={() => { 
                    props.updateScheduledPickups(dummyData);
                    props.setPage("home");
                }}
            />
            {/* <Button
=======
        <Button
            mode='contained'
            onPress={() => {
                props.updateScheduledPickups(dummyData);
                props.setPage("home");
            }}
        >
            Confirm
        </Button>
        {/* <Button
>>>>>>> 00ebd3c3f56a41f99ee43f8bc54c437d5a0b8453
                title="Back"
                onPress={() => { props.setForm(3) }}
            /> */}
        <Button mode="contained" onPress={() => {
            logoutUser();
            props.setPage('home');
        }}>
            Logout
        </Button>
    </View>
)

const mapStateToProps = state => {
    return {
        nav: state.nav
    }
}

const mapDispatchToProps = {
    updateScheduledPickups: updateScheduledPickups
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryScreen);


