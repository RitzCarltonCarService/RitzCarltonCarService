import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Logo from '../../../../components/Logo.js';

class ToLocationItem extends PureComponent {

    render() {
        return (
            <GoogleAutoComplete apiKey={this.props.googAPI} debounce={300} components="country:usa">
                {({ fetchDetails }) => (
                    <TouchableOpacity 
                        style={styles.root} 
                        onPress={() => {
                            const handlePress = async () => {
                                const res = await fetchDetails(this.props.place_id);
                                // console.log("This is the response: ", res)
                                // Accessing lat/lng coordinates from API response
                                const coords = res.geometry.location;
                                // Passing fromLocation's coordinates to Redux state
                                this.props.updateToLocation(coords); 
                                // console.log("These are coords: ", coords);
                                this.props.updateToState(res.formatted_address);
                            };
                            handlePress();
                            // on selection of item, set view of Time/Date Picker to true
                            this.props.setToValue();
                            this.props.clearToValues();
                            this.props.clearToSelections();
                        }}>
                        {this.props.description === 'The Ritz-Carlton Residences' && 
                            <Logo style={{ width: 40, height: 40 }} /> 
                        }
                        {this.props.description === 'Philadelphia International Airport' && 
                            <Icon style={{marginRight: 20}} name="airplane" size={30} /> 
                        }
                        {this.props.description !== 'Philadelphia International Airport' &&
                            this.props.description !== 'The Ritz-Carlton Residences' &&
                            <Icon style={{marginRight: 20}} name="map-marker-outline" size={30} />
                        } 
                        <Text>{this.props.description}</Text>
                    </TouchableOpacity>
                )}
            </GoogleAutoComplete>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        height: '25%',
        paddingHorizontal: '25%',
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row'
    }
})

export default ToLocationItem;