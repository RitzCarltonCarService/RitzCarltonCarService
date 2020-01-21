import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
                                // console.log("These are the To coordinates: ", coords)
                                // Passing fromLocation's coordinates to Redux state
                                this.props.updateToLocation(coords); 
                            };
                            handlePress();
                            this.props.updateToState(this.props.description);
                            this.props.clearToSelections();
                            // on selection of item, set view of Time/Date Picker to true
                            this.props.setToValue();
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

export default ToLocationItem;