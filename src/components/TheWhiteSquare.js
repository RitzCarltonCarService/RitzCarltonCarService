/**
 * TheWhiteSquare is just a Surface tag with some universal styling.
 * https://callstack.github.io/react-native-paper/surface.html
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Params ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * @param {Object} style - Extra styles for the Surface Tag if needed
 * @param {Number} width - Component width
 * @param {Number} height - Component height
 * @param {Number} top - Distance from the top of the screen
 * @param {Object} animationData - End positions for animations
 * @param {Number} duration - How long the animation will go for
 * @param {Any} children - Anything that will exsist inside of TheWhiteSquare
 * @param {Any} props - Any other props that the Surface Tag might take that you need will be
 *    passed in here, Please see the react-native-paper Surface Docs for a full list of props
 */

import React, { memo, useState, useEffect } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Surface } from 'react-native-paper';
import { units } from '../core/untilities';

const TheWhiteSquare = ({ style, width = 80, height = 50, top = 10, animationData, duration, children, ...props }) => {
    const [animValues] = useState(new Animated.ValueXY({ x: height * units.vh, y: ((top * units.vh) + getStatusBarHeight()) }));

    const styles = StyleSheet.create({
        surface: {
            width: width * units.vw,
            height: height * units.vh,
            top: (top * units.vh) + getStatusBarHeight(),
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
        }
    });

    useEffect(() => {
        if (animationData) {
            Animated.timing(animValues, {
                toValue: { x: animationData.height * units.vh, y: ((animationData.top * units.vh) + getStatusBarHeight()) },
                duration: duration,
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
