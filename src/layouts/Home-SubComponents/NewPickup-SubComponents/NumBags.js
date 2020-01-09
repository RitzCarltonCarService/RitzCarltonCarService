import React from './node_modules/react';
import { connect } from './node_modules/react-redux';
import { navigate } from '../../../redux/actions';
import { View, Text, Button } from 'react-native';

const NumBags = props => {
    return (
        <View>
            <Text>
                Form 1
            </Text>
            <Button
                title="Next"
                onPress={() => { props.setForm(2) }}
            />
        </View>
    )
}

const mapDispatchToProps = {
    navigate: navigate
}

export default connect(null, mapDispatchToProps)(NumBags);