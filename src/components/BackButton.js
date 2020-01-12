/*
 * The BackButton component is just a clickable image with some universal styling.
 * https://facebook.github.io/react-native/docs/touchableopacity#__docusaurus
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Params ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * @goBack - TYPE: Function, DESC: The function used to handle the onPress action
 * @style - TYPE: Object, DESC: Extra styles for the button
 * @imageStyle - TYPE: Object, DESC: Styles spacifically for the image, for example if you need to
 *               change the width and height you can do so by passing it in here
 * @props - Any other props that TochableOpacity might take that you need will be passed in here,
 *          Please see the TochableOpacity Docs for a full list of props
 */

import React, { memo } from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

const BackButton = ({ goBack, style, imageStyle, ...props }) => (
   <TouchableOpacity
      onPress={goBack}
      style={[
         styles.container,
         style
      ]}
      {...props}
   >
      <Image
         style={[
            styles.image,
            imageStyle
         ]}
         source={require("../../assets/arrow_back.png")}
      />
   </TouchableOpacity>
);

const styles = StyleSheet.create({
   container: {
      position: "absolute",
      top: 10 + getStatusBarHeight(),
      left: 10
   },
   image: {
      width: 24,
      height: 24
   }
});

export default memo(BackButton);
