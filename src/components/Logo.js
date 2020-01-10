import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = (props) => {

   const size = props.size || 128;
   const marginBottom = props.marginBottom || 12;

   const styles = StyleSheet.create({
      image: {
         width: size,
         height: size,
         marginBottom: marginBottom,
      },
   });

   return (
      <Image source={require('../../assets/RitzLogo.png')} style={styles.image} />
   )
};



export default Logo;
