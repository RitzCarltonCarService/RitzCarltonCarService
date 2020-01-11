import React from 'react';
import { connect } from 'react-redux';
import { updateScheduledPickups } from '../../../redux/actions';
import { View, Text, Button } from 'react-native';
import dummyData from '../../../dummyData/dummy_pickup_data';
import { State } from 'react-native-gesture-handler';

const SummaryScreen = props => (
        <View>
            <Text>
                Form 4
            </Text>
            <Button
                title="Confirm"
                onPress={() => { 
                    props.updateScheduledPickups(dummyData);
                    props.setPage("home");
                }}
            />
            <Button
                title="Back"
                onPress={() => { props.setForm(3) }}
            />
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