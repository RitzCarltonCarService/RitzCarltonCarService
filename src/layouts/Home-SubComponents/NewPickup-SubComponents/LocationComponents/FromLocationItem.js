import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';

class FromLocationItem extends PureComponent {

    render() {
        return (
            <GoogleAutoComplete apiKey={this.props.googAPI} debounce={300} components="country:usa">
                {({ fetchDetails }) => (
                    <TouchableOpacity 
                        style={styles.root} 
                        onPress={() => {
                            handlePress = async () => {
                                const res = await fetchDetails(this.props.place_id);
                                // Accessing lat/lng coordinates from API response
                                const coords = res.geometry.location;
                                console.log("These are the location's details: ", res.geometry.location);
                                // Passing fromLocation's coordinates to Redux state
                                this.props.updateFromLocation(coords); 
                                this.props.updateFromState(res.formatted_address);
                            };
                            handlePress();
                            this.props.setFromValue();
                            this.props.clearFromSelections();
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
        height: '50%',
        paddingHorizontal: '25%',
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
        backgroundColor: 'white'
    }
})

export default FromLocationItem;