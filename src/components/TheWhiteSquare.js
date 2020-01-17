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

import React, { memo, useState, useEffect } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Surface } from 'react-native-paper';
import { vh, vw } from 'react-native-viewport-units';

const TheWhiteSquare = ({ style, width = 80, height = 50, top = 10, animationData, children, ...props }) => {
    const [animValues] = useState(new Animated.ValueXY({ x: height * vh, y: ((top * vh) + getStatusBarHeight()) }));

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

    useEffect(() => {
        if (animationData) {
            Animated.timing(animValues, {
                toValue: { x: animationData.height * vh, y: ((animationData.top * vh) + getStatusBarHeight()) },
                duration: animationData.duration,
            }).start();
        };
    }, [animationData]);

    return (
        <Surface
            style={{
                ...styles.surface,
                ...style,
                ...(animationData ? { height: animValues.x, top: animValues.y } : {}),
            }}
            {...props}
        >
            {children}
        </Surface>
    )
};


export default memo(TheWhiteSquare);
