/*
 * The Header is just a Text tag with some universal styling.
 * https://facebook.github.io/react-native/docs/text#__docusaurus
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Params ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * @style - TYPE: Object, DESC: Extra styles for the Text Tag if needed
 * @children (Required) - TYPE: String, DESC: The text in the Text Tag
 * @props - Any other props that the Text Tag might take that you need will be passed in here,
 *          Please see the Text Docs for a full list of props
 */

import React, { memo } from "react";
import { StyleSheet, Text } from "react-native";
import { theme } from "../core/theme";

const Header = ({ style, children, ...props }) => <Text style={[styles.header, style]} {...props}>{children}</Text>;

const styles = StyleSheet.create({
   header: {
      fontSize: 26,
      color: theme.colors.primary,
      fontWeight: "bold",
      paddingVertical: 14,
      textAlign: "center",
   }
});

export default memo(Header);
