import React from 'react';
import {connect} from 'react-redux';
import {navigate} from '../../actions/actions';
import { View, Text, Button } from 'react-native';

import pickupData from "./dummy_pickup_data";

const MainScreen = props => {

    return (
        <View>
            <Text>
                Main Screen
            </Text>
            {pickupData.map(pickup => {
                return (
                    <Button
                        title={pickup.name}
                        onPress={() => {props.setPage("pickup info")}}
                    />
                )
            })}
            <Button
                title="New Pickup"
                onPress={() => {props.setPage("new pickup")}}
            />
        </View>
    )
}

const mapDispatchToProps = {
    navigate: navigate
}

export default connect(null, mapDispatchToProps)(MainScreen);