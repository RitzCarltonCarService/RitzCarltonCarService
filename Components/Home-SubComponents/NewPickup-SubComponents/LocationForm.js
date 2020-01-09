import React from 'react';
import {connect} from 'react-redux';
import {navigate} from '../../../actions/actions';
import { View, Text, Button } from 'react-native';

const LocationForm = props => {
    return (
        <View>
            <Text>
                Form 0
            </Text>
            <Button
                title="Next"
                onPress= {() => {props.setForm(1)}}
            />
        </View>
    )
}

const mapDispatchToProps = {
    navigate: navigate
}

export default connect(null, mapDispatchToProps)(LocationForm);