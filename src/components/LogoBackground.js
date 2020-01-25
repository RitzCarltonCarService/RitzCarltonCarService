/**
 * The LogoBackground is a background made using react-native ImageBackground
 * react-native ImageBackground docs: https://github.com/react-native-community/react-native-maps/blob/HEAD/docs/mapview.md
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Params ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * @param {String} resizeMode - Determines how to resize the image when the frame doesn't match
 *    the raw image dimensions.
 *       'cover': Scale the image uniformly (maintain the image's aspect ratio) so that both dimensions
 *          (width and height) of the image will be equal to or larger than the corresponding dimension
 *          of the view (minus padding).
 *       'contain': Scale the image uniformly (maintain the image's aspect ratio) so that both dimensions
 *          (width and height) of the image will be equal to or less than the corresponding dimension of
 *          the view (minus padding).
 *       'stretch': Scale width and height independently, This may change the aspect ratio of the src.
 *       'stretch': Scale width and height independently, This may change the aspect ratio of the src.
 * @param {Object} imageStyles - Allows you to add more styling to the ImageBackground tag on top
 *    of the default ones.
 * @param {Object} containerStyles - Allows you to add more styling to the KeyboardAvoidingView tag
 *    on top of the default ones.
 * @param {Any} children - Where any other components placed inside of LogoBackground will go
 */

import React, { memo } from "react";
import {
   KeyboardAvoidingView,
   ImageBackground,
   StyleSheet,
} from "react-native";

const LogoBackground = ({ resizeMode = 'center', imageStyles, containerStyles, children }) => (
   <ImageBackground
      source={require("../../assets/RitzLogo.png")}
      resizeMode={resizeMode}
      style={[
         styles.background,
         imageStyles
      ]}
   >
      <KeyboardAvoidingView
         style={[
            styles.container,
            containerStyles
         ]}
         behavior="padding"
      >
         {children}
      </KeyboardAvoidingView>
   </ImageBackground>
);

const styles = StyleSheet.create({
   background: {
      flex: 1,
      width: "100%"
   },
   container: {
      flex: 1,
      padding: 20,
      width: "100%",
      maxWidth: 340,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center"
   }
});

export default memo(LogoBackground);
