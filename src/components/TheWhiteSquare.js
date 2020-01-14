/*
 * TheWhiteSquare is just a Surface tag with some universal styling.
 * https://callstack.github.io/react-native-paper/surface.html
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Params ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * @style - TYPE: Object, DESC: Extra styles for the Surface Tag if needed
 * @width - TYPE: Number, DESC: Component width
 * @height - TYPE: Number, DESC: Component height
 * @top - TYPE: Number, DESC: Distance from the top of the screen
 * @children - DESC: Anything that will exsist inside of TheWhiteSquare
 * @props - Any other props that the Surface Tag might take that you need will be passed in here,
 *          Please see the react-native-paper Surface Docs for a full list of props
 */

import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import { vh, vw } from 'react-native-viewport-units';
import { getStatusBarHeight } from "react-native-status-bar-height";

const TheWhiteSquare = ({ style, width = 80, height = 50, top = 10, children, ...props }) => {
    const styles = StyleSheet.create({
        surface: {
            width: width * vw,
            height: height * vh,
            top: (top * vh) + getStatusBarHeight(),
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
        }
    });

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


export default memo(TheWhiteSquare);
