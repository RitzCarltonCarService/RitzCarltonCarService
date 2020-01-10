import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
const { vh, vw } = require('react-native-viewport-units');

//can be passed a height prop that specifies height of square by percentage
//of screen height; set to 50 as default

export default TheWhiteSquare = props => {

    const height = props.height || 50;

    const styles = StyleSheet.create({
        container: {
            height: height * vh,
            width: 100 * vw,
            alignItems: "center",
            elevation: 4
        },
        surface: {
            height: 50 * vh,
            width: 80 * vw,
            top: 20 * vh,
            alignItems: "center",
            justifyContent: "center"
        }
    })

    return (
        <View>
            <Surface style={styles.surface}>
                {props.children}
            </Surface>
        </View>
    )
}

