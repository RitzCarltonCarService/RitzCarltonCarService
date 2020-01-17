import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';

class ToLocationItem extends PureComponent {

    render() {
        return (
            <GoogleAutoComplete apiKey="AIzaSyBpktIvH-LC6Pwrp0ShC7NbjH5AqoySf8s" debounce={300} components="country:usa">
                {({ fetchDetails, clearSearch }) => (
                    <TouchableOpacity 
                        style={styles.root} 
                        onPress={() => {
                            handlePress = async () => {
                                console.log("This is the location's address", this.props.description)
                                const res = await fetchDetails(this.props.place_id);
                                console.log("These are the location's details: ", res);
                                // Accessing lat/lng coordinates from API response
                                const coords = res.geometry.location;
                                console.log("These are the location's coordinates: ", coords)
                                // Passing fromLocation's coordinates to Redux state
                                this.props.updateToLocation(coords); 
                            };
                            this.props.updateToState(this.props.description);
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

export default ToLocationItem;