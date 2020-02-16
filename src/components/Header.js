/**
 * The Header is just a Text tag with some universal styling.
 * https://facebook.github.io/react-native/docs/text#__docusaurus
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Params ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * @param {Object} style - Extra styles for the Text Tag if needed
 * @param {String} children (Required) - The text in the Text Tag
 * @param {Any} props - Any other props that the Text Tag might take that you need will be passed
 *    in here, Please see the Text Docs for a full list of props
 */

import React, { memo, useState, useEffect } from "react";
import { StyleSheet, Animated } from "react-native";
import { theme } from "../core/theme";

const Header = ({ style, animationData, children, ...props }) => {
   const [animValue] = useState(new Animated.Value(26));

   const styles = StyleSheet.create({
      header: {
         fontSize: 26,
         color: theme.colors.primary,
         fontWeight: "bold",
         paddingVertical: 12,
         textAlign: "center",
      }
   });

   useEffect(() => {
      if (animationData) {
         Animated.timing(animValue, {
            toValue: animationData.fontSize,
            duration: animationData.duration,
         }).start();
      };
   }, [animationData]);

   return (
      <Animated.Text
         style={{
            ...styles.header,
            ...style,
            ...(animationData ? { fontSize: animValue } : {}),
         }}
         {...props}
      >
         {children}
      </Animated.Text>
   )
};


export default memo(Header);
