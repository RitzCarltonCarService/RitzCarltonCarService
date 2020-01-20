import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';

class ToLocationItem extends PureComponent {

    render() {
        return (
            <GoogleAutoComplete apiKey={this.props.googAPI} debounce={300} components="country:usa">
                {({ fetchDetails, clearSearch }) => (
                    <TouchableOpacity 
                        style={styles.root} 
                        onPress={() => {
                            handlePress = async () => {
                                const res = await fetchDetails(this.props.place_id);
                                // Accessing lat/lng coordinates from API response
                                const coords = res.geometry.location;
                                // Passing fromLocation's coordinates to Redux state
                                this.props.updateToLocation(coords); 
                            };
                            handlePress();
                            this.props.updateToState(this.props.description);
                            this.props.clearToSelections();
                            // on selection of item, set view of Time/Date Picker to true
                            this.props.viewTimePicker(true);
                        }}> 
                        <Text>{this.props.description}</Text>
                    </TouchableOpacity>
                )}
            </GoogleAutoComplete>
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

export default ToLocationItem;