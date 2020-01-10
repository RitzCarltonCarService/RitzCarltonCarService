/*
 * The Button component is just a react-native-paper button with some universal styling.
 * react-native-paper button docs: https://callstack.github.io/react-native-paper/button.html
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Params ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * @mode - TYPE: 'text' | 'outlined' | 'contained', DESC: Mode of the button. You can change the mode to adjust the styling
 *         to give it desired emphasis.
 *    'text' - flat button without background or outline (low emphasis)
 *    'outlined' - button with an outline (medium emphasis)
 *    'contained' - button with a background color and elevation shadow (high emphasis)
 * @style - TYPE: Object, DESC: Allows you to add more styling to the button on top of the default ones
 * @children (Required) - TYPE: String, DESC: Label text of the button
 * @props - TYPE: Varied, DESC: Any other react-native-paper button props,
 *          please see the react-native-paper button docs for a full list of the other availible props
 */

import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { theme } from "../core/theme";

const Button = ({ mode, style, children, ...props }) => (
   <PaperButton
      mode={mode}
      style={[
         styles.button,
         mode === "outlined" && { backgroundColor: theme.colors.surface },
         style
      ]}
      labelStyle={[
         styles.text,
         mode === "contained" && { color: theme.colors.surface }
      ]}
      {...props}
   >
      {children}
   </PaperButton>
);

const styles = StyleSheet.create({
   button: {
      width: "100%",
      marginVertical: 10,
      backgroundColor: theme.colors.primary,
   },
   text: {
      fontWeight: "bold",
      fontSize: 15,
      lineHeight: 26,
      color: theme.colors.secondary,
   }
});

export default mem0(Button);
