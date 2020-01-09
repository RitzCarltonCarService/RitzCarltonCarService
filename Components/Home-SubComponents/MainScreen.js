import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../redux/actions';
import { View, Text, Button } from 'react-native';

const MainScreen = props => {
    return (
        <View>
            <Text>
                Main Screen
            </Text>
            <Button
                title="New Pickup"
                onPress={() => { props.navigate("new pickup", 0) }}
            />
        </View>
    )
}

const mapDispatchToProps = {
    navigate: navigate
}

export default connect(null, mapDispatchToProps)(MainScreen);