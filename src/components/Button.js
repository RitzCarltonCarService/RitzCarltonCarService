import React from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { theme } from "../core/theme";

const Button = ({ mode, style, children, ...props }) => (
   <PaperButton
      style={[
         styles.button,
         mode === "outlined" && { backgroundColor: theme.colors.surface },
         style
      ]}
      labelStyle={[
         styles.text,
         mode === "contained" && { color: theme.colors.surface }
      ]}
      mode={mode}
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

export default Button;
