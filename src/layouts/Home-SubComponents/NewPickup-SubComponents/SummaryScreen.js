import React from './node_modules/react';
import { connect } from './node_modules/react-redux';
import { navigate } from '../../../redux/actions';
import { View, Text, Button } from 'react-native';

const SummaryScreen = props => {
    return (
        <View>
            <Text>
                Form 4
            </Text>
            <Button
                onPress={() => { props.setPage("home") }}
            />
        </View>
    )
}

const mapDispatchToProps = {
    navigate: navigate
}

export default connect(null, mapDispatchToProps)(SummaryScreen);