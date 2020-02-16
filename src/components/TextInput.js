/**
 * The TextInput is just a react-native-paper Input tag with some universal styling.
 * https://callstack.github.io/react-native-paper/text-input.html
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Params ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * @param {'flat' | 'outlined'} mode - Mode of the TextInput.
 *    'flat' - flat input with an underline.
 *    'outlined' - input with an outline.
 * @param {Object} containerStyle - Extra styles for the View Tag that wraps the Input and Error tags
 * @param {Object} style - Extra styles for the Input Tag if needed
 * @param {String} errorText - The error text used for error handling
 * @param {Any} props - Any other props that the Input Tag might take that you need will be passed
 *    in here, Please see the react-native-paper TextInput Docs for a full list of props
 */

import React, { memo } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { theme } from "../core/theme";

const TextInput = ({ mode, containerStyle, style, errorText, ...props }) => (
   <View style={{ ...styles.container, ...containerStyle }}>
      <Input
         selectionColor={theme.colors.primary}
         underlineColor="transparent"
         mode={mode || "outlined"}
         style={{
            ...styles.input,
            ...style
         }}
         {...props}
      />
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
   </View>
);

const styles = StyleSheet.create({
   container: {
      width: "100%",
      marginVertical: 12
   },
   input: {
      backgroundColor: theme.colors.surface,
   },
   error: {
      fontSize: 14,
      color: theme.colors.error,
      paddingHorizontal: 4,
      paddingTop: 4
   }
});

export default memo(TextInput);
