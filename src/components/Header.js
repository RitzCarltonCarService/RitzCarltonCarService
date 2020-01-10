import React from "react";
import { StyleSheet, Text } from "react-native";
import { theme } from "../core/theme";

const Header = ({ children }) => <Text style={styles.header}>{children}</Text>;

console.log(theme.colors.primary)

const styles = StyleSheet.create({
   header: {
      fontSize: 26,
      color: theme.colors.primary,
      fontWeight: "bold",
      paddingVertical: 14,
      textAlign: "center",
   }
});

export default Header;
