/*
 * TheWhiteSquare is just a Surface tag with some universal styling.
 * https://callstack.github.io/react-native-paper/surface.html
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Params ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * @style - Type: Object, DESC: Extra styles for the Surface Tag if needed
 * @children - DESC: Anything that will exsist inside of TheWhiteSquare
 * @props - Any other props that the Surface Tag might take that you need will be passed in here,
 *          Please see the react-native-paper Surface Docs for a full list of props
 */

import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import { vh, vw } from 'react-native-viewport-units';

const TheWhiteSquare = ({ style, children, ...props }) => (
    <Surface
        style={[
            styles.surface,
            style
        ]}
        {...props}
    >
        {children}
    </Surface>
);

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
