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


