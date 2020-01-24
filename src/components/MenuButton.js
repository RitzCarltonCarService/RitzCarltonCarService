import React, { memo } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const MenuButton = ({ icon = 'menu', style, onPress, top = 10, ...props }) => {
   const styles = StyleSheet.create({
      container: {
         position: "absolute",
         top: top + getStatusBarHeight(),
         left: 10
      },
   });

   return (
      <IconButton
         style={{
            ...styles.container,
            ...style
         }}
         onPress={onPress}
         icon={icon}
         animated={true}
         {...props}
      />
   )
};

export default memo(MenuButton);
