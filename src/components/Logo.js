/*
 * The Header is just a Image tag with some universal styling.
 * https://facebook.github.io/react-native/docs/images#__docusaurus
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Params ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * @style - TYPE: Object, DESC: Extra styles for the Text Tag
 * @props - Any other props that the Text Tag might take that you need will be passed in here,
 *          Please see the Image Docs for a full list of props
 */

import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = ({ style, ...props }) => (
   <Image source={require('../../assets/RitzLogo.png')} style={[styles.image, style]} {...props} />
);

const styles = StyleSheet.create({
   image: {
      width: 128,
      height: 128,
   },
});

export default memo(Logo);
