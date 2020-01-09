import React from 'react';
import {connect} from 'react-redux';
import {navigate} from '../../../actions/actions';
import { View, Text, Button } from 'react-native';

const RideShareQuestion = props => {
    return (
        <View>
            <Text>
                Form 3
            </Text>
            <Button
                title="Next"
                onPress= {() => {props.setForm(4)}}
            />
        </View>
    )
}

const mapDispatchToProps = {
    navigate: navigate
}

export default connect(null, mapDispatchToProps)(RideShareQuestion);