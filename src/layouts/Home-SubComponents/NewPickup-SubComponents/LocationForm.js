import React from './node_modules/react';
import { connect } from './node_modules/react-redux';
import { navigate } from '../../../redux/actions';
import { View, Text, Button } from 'react-native';

const LocationForm = props => {
    return (
        <View>
            <Text>
                Form 0
            </Text>
            <Button
                title="Next"
                onPress={() => { props.setForm(1) }}
            />
        </View>
    )
}

const mapDispatchToProps = {
    navigate: navigate
}

export default connect(null, mapDispatchToProps)(LocationForm);