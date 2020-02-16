import React, { memo } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import {Surface} from "react-native-paper";
import { theme } from "../../../../core/theme.js";
import Button from '../../../../components/Button';
import DateAndTimePicker from './DateAndTimePicker.js';

const DateTimeMapView = props => {
    return (
        <View>
            <Surface style={styles.surface}>
                <TouchableOpacity 
                    style={styles.button}
                    // onPress={this.onPress}
                >
                    <Text>Hello!</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button}
                    // onPress={this.onPress}
                >
                    <Text>Hello!!!</Text>
                </TouchableOpacity>  
                <DateAndTimePicker
                    currentDate={props.currentDate} 
                    dateAlert={props.dateAlert}     
                    setDate={props.setDate}
                >
                </DateAndTimePicker>
            </Surface>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: {
        alignItems: 'center',
        color: 'red',
        height: '100%'
    },
    surface: {
        flex: 1,
        width: '200%',
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