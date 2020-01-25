/**
 * Toast is just a react-native-paper Snackbar tag with some universal styling.
 * Snackbars provide brief feedback about an operation through a message at the bottom of the screen.
 * Snackbar by default use onSurface color from theme
 * https://callstack.github.io/react-native-paper/snackbar.html
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Params ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * @param {String} type - Styles the Snackbar based on the type
 * @param {Number} duration - How long the message displays, 1s === 1000.
 * @param {String} message - The message text displayed by the Snackbar
 * @param {() => void} onDimiss - Callback called when Snackbar is dismissed. The visible prop needs
 *    to be updated when this is called.
 * @param {Any} props - Any other props that the Snackbar Tag might take that you need will be passed
 *    in here, Please see the react-native-paper Snackbar Docs for a full list of props
 */

import React, { memo } from "react";
import { Snackbar } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { theme } from "../core/theme";

const Toast = ({ type = "error", duration = 2000, message, onDismiss, ...props }) => (
   <View style={styles.container}>
      <Snackbar
         visible={!!message}
         duration={duration}
         onDismiss={onDismiss}
         style={{
            backgroundColor: type === "error" ? theme.colors.error : theme.colors.accentSecondary
         }}
         {...props}
      >
         <Text style={styles.content}>{message}</Text>
      </Snackbar>
   </View>
);

const styles = StyleSheet.create({
   container: {
      position: "absolute",
      top: 80 + getStatusBarHeight(),
      width: "100%"
   },
   content: {
      fontWeight: "500"
   }
});

export default memo(Toast);
