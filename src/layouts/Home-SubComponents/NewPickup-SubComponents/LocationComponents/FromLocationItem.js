import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Logo from '../../../../components/Logo.js';

class FromLocationItem extends PureComponent {

    render() {
        return (
            <GoogleAutoComplete apiKey={this.props.googAPI} debounce={300} components="country:usa">
                {({ fetchDetails }) => (
                    <TouchableOpacity 
                        style={styles.root} 
                        onPress={() => {
                            const handlePress = async () => {
                                const res = await fetchDetails(this.props.place_id);
                                // Accessing lat/lng coordinates from API response
                                const coords = res.geometry.location;
                                // console.log("These are the location's details: ", res.geometry.location);    
                                // Passing fromLocation's coordinates to Redux state
                                this.props.updateFromLocation(coords); 
                                this.props.updateFromState(res.formatted_address);
                            };
                            handlePress();
                            this.props.clearFromValues();
                            this.props.setFromValue();
                            this.props.clearFromSelections();
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

export default FromLocationItem;