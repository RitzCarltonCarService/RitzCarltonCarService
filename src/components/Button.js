/**
 * The Button component is just a react-native-paper button with some universal styling.
 * react-native-paper button docs: https://callstack.github.io/react-native-paper/button.html
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Params ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * @param {'text' | 'outlined' | 'contained'} mode - Mode of the button. You can change the mode
 *    to adjust the styling to give it desired emphasis.
 *       'text' - flat button without background or outline (low emphasis)
 *       'outlined' - button with an outline (medium emphasis)
 *       'contained' - button with a background color and elevation shadow (high emphasis)
 * @param {Object} style - Allows you to add more styling to the button on top of the default ones
 * @param {Object} labelStyle - Allows you to add more styling to the text on top of the default ones
 * @param {String} children (Required) - Label text of the button
 * @param {Any} props - Any other react-native-paper button props, please see the react-native-paper
 *    button docs for a full list of the other availible props
 */

import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { theme } from "../core/theme";

let hour = new Date().getHours();
let borderWidthTemp = null;
let borderColorTemp = null;
(hour > 18 || hour < 6) ? (borderWidthTemp = .5, borderColorTemp = 'white') : null

const Button = ({ mode, style, labelStyle, children, ...props }) => (
<<<<<<< HEAD
   
   <PaperButton
      mode={mode}
      style={[
         styles.button,
         mode === "outlined" && { backgroundColor: theme.colors.surface },
         style,
         style={ borderWidth: borderWidthTemp, borderColor: borderColorTemp}
      ]}
      // {hour > 18 || hour < 6 ?  style= {borderWidth: 0.5, borderColor: 'white'}}
      labelStyle={[
         styles.text,
         mode === "contained" && { color: theme.colors.surface },
         labelStyle
      ]}
=======

   <PaperButton
      mode={mode}
      style={{
         ...styles.button,
         // mode === "outlined" && { backgroundColor: theme.colors.surface },
         ...{ borderWidth: borderWidthTemp, borderColor: borderColorTemp },
         ...style,
      }}
      labelStyle={{
         ...styles.text,
         // mode === "contained" && { color: theme.colors.surface },
         ...labelStyle
      }}
>>>>>>> 6ecd82d853a6b9ec2a168295f015d6b9e9d0c07c
      {...props}
   >
      {children}
   </PaperButton>
);

const styles = StyleSheet.create({
   button: {
      width: "100%",
      marginVertical: 15,
      backgroundColor: theme.colors.primary,
      borderRadius: 10
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

export default memo(Button);
