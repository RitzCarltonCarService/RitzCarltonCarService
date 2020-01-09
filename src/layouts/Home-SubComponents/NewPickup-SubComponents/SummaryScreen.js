import React from 'react';
import { connect } from 'react-redux';
import { updateScheduledPickups } from '../../../redux/actions';
import { View, Text, Button } from 'react-native';
import dummyData from '../../../dummyData/dummy_pickup_data';
import { State } from 'react-native-gesture-handler';

const SummaryScreen = props => {
    return (
        <View>
            <Text>
                Form 4
            </Text>
            <Button
                title="Confirm"
                onPress={() => { 
                    console.log("logging is working");
                    props.updateScheduledPickups(dummyData);
                    props.setPage("home");
                }}
            />
        </View>
    )
}

const mapStateToProps = state => {
    return {
        nav: state.nav
    }
}

const mapDispatchToProps = {
    updateScheduledPickups: updateScheduledPickups
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryScreen);