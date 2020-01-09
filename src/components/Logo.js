import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
   <Image source={require('../../assets/RitzLogo.png')} style={styles.image} />
);

const styles = StyleSheet.create({
   image: {
      width: 128,
      height: 128,
      marginBottom: 12,
   },
});

export default Logo;
