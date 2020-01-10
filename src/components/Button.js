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
      marginVertical: 10
   },
   text: {
      fontFamily: "Arial",
      letterSpacing: 2,
      fontWeight: "bold",
      fontSize: 15,
      lineHeight: 26
   }
});

export default Button;
