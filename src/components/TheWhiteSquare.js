import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
const { vh, vw } = require('react-native-viewport-units');

export default TheWhiteSquare = props => {
    return (
        <View>
            <Surface style={styles.surface}>
                {props.children}
            </Surface>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 100 * vh,
        width: 100 * vw,
        alignItems: "center",
        elevation: 4
    },
    surface: {
        height: 45 * vh,
        width: 80 * vw,
        top: 20 * vh,
        alignItems: "center",
        justifyContent: "center"
    }
})

