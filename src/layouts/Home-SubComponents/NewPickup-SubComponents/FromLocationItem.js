import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';

class FromLocationItem extends PureComponent {

    _handlePress = async () => {
        const res = await this.props.fetchDetails(this.props.place_id);
        console.log("This is the result", res);
    }

    render() {
        return (
            <TouchableOpacity style={styles.root} onPress={() => { this._handlePress; this.props.clearSearch(); this.props.updateFromState(this.props.description); }}> 
                <Text>{this.props.description}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        height: 40,
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
        backgroundColor: 'white'
    }
})

export default FromLocationItem;