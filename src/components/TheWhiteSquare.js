import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
const { vh, vw } = require('react-native-viewport-units');

const TheWhiteSquare = props => {
    return (
        <Surface
            style={[
                styles.surface,
                style
            ]}
            {...props}
        >
            {children}
        </Surface>
    )
};


const styles = StyleSheet.create({
    surface: {
        height: 50 * vh,
        width: 80 * vw,
        top: 20 * vh,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    }
})

export default memo(TheWhiteSquare);
