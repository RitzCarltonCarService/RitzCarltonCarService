import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../../redux/actions';
import { View, Text, Button } from 'react-native';

const NumPassengers = props => {
    return (
        <View>
            <Text>
                Form 2
            </Text>
            <Button
                title="Next"
                onPress={() => { props.setForm(3) }}
            />
        </View>
    )
}

const mapDispatchToProps = {
    navigate: navigate
}

export default connect(null, mapDispatchToProps)(NumPassengers);