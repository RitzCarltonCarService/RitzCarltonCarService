import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';

class FromLocationItem extends PureComponent {

    render() {
        return (
            <GoogleAutoComplete apiKey="AIzaSyBpktIvH-LC6Pwrp0ShC7NbjH5AqoySf8s" debounce={300} components="country:usa">
                {({ fetchDetails, clearSearch }) => (
                    <TouchableOpacity 
                        style={styles.root} 
                        onPress={() => {
                            handlePress = async () => {
                                const res = await fetchDetails(this.props.place_id);
                                // console.log("These are the location's details: ", res);
                                // Accessing lat/lng coordinates from API response
                                const coords = res.geometry.location;
                                // Passing fromLocation's coordinates to Redux state
                                this.props.updateFromLocation(coords); 
                            };
                            this.props.updateFromState(this.props.description);
                            handlePress();
                            clearSearch();
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

export default FromLocationItem;