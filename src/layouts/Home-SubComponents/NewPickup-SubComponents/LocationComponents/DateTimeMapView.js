import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import {Surface} from "react-native-paper";
import { theme } from "../../../../core/theme.js";
import Button from '../../../../components/Button';
import DateAndTimePicker from './DateTimePicker.js';

const DateTimeMapView = props => {
    return (
        <View>
            <Surface style={styles.surface}>
                <Button> 
                    Back 
                </Button>
                <TouchableOpacity
                    style={styles.button}
                    // onPress={this.onPress}
                >
                    <Text> Touch Here </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    // onPress={this.onPress}
                >
                    <Text> Touch Here </Text>
                </TouchableOpacity>
            </Surface>
            <View style={styles.buttonContainer}>  
                <DateAndTimePicker 
                    currentDate={props.currentDate} 
                    dateAlert={props.dateAlert}     
                />
            </View>
            <View style={styles.singleRideButtonContainer}>
                <Button style={styles.backButton} 
                    mode='contained' 
                    onPress={() => props.setForm(1)}
                >
                    Next
                </Button>
                <Button style={styles.backButton} 
                    mode='contained' 
                    onPress={() => props.setPage("home")}
                >
                    Back
                </Button>
            </View>
            }  
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    surface: {
        flex: 1,
        width: '200%',
        marginTop: '7%',
        maxHeight: '30%',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: Platform.OS === 'ios' ? "Arial" : "Roboto",
        letterSpacing: 2,
        fontWeight: "bold",
        fontSize: 15,
        lineHeight: 40,
        color: theme.colors.secondary,
    }
});

export default memo(DateTimeMapView);