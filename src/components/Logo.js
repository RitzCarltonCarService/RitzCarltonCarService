/*
 * The Header is just a Image tag with some universal styling.
 * https://facebook.github.io/react-native/docs/images#__docusaurus
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Params ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * @style - Type: Object, DESC: Extra styles for the Text Tag
 * @imageName - Type: String, DESC: The name of the image you want to use for the logo.
 *              THE IMAGE HAS TO BE IN THE ASSETS FOLDER
 * @props - Any other props that the Text Tag might take that you need will be passed in here,
 *          Please see the Image Docs for a full list of props
 */

import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = (style, imageName, ...props) => <Image source={require(`../../assets/${imageName || RitzLogo.png}`)} style={[styles.image, style]} {...props} />;

const styles = StyleSheet.create({
   image: {
      width: 128,
      height: 128,
      marginBottom: 12,
   },
});

export default memo(Logo);
