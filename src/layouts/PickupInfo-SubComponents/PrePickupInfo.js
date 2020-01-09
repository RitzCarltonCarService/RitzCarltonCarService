import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../actions';
import { View, Text, Button } from 'react-native';

const PrePickupInfo = props => {
    return (
        <View>
            <Text>
                Pickup Info
            </Text>
            <Text>
                Pickup info will be collected from the redux store.
            </Text>
            <Button
                title="Back"
                onPress={() => { props.setPage("home") }}
            />
        </View>
    )
}

const mapDispatchToProps = {
    navigate: navigate
}

export default connect(null, mapDispatchToProps)(PrePickupInfo);