import React, { memo } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { logoutUser } from '../core/auth-api';
import { vw } from 'react-native-viewport-units';
import Header from '../components/Header';
import Button from './Button';
import MenuButton from '../components/MenuButton';
import Paragragph from '../components/Paragraph';
import TheWhiteBox from '../components/TheWhiteSquare';

const Main = () => {
   const styles = StyleSheet.create({
      logoWrapper: {
         flexDirection: 'row',
         alignItems: 'center'
      },
      paragragph: {
         textAlign: 'left',
         width: 100
      },
      theWhiteBox: {
         justifyContent: 'space-between',
         right: (vw * 8),
         backgroundColor: '#000000'
      },
      image: {
         width: 128,
         height: 128
      },
      menuButton: {
         position: 'relative',
      }
   });

   return (
      <>
         <MenuButton
            icon={'account'}
            color={'white'}
            size={80}
            top={0}
            style={styles.menuButton}
         ></MenuButton>

         <Button mode={'text'} onPress={() => console.log('View Profile')}>View Profile</Button>

         <Header style={{ color: '#FFFFFF' }} onPress={_handleRequestPickup}>{`Request Pick-up`}</Header>
         <Header style={{ color: '#FFFFFF' }}>{`Ride History`}</Header>
         <Header style={{ color: '#FFFFFF' }}>{`Settings`}</Header>
         <Header style={{ color: '#FFFFFF' }}>{`Help`}</Header>
      </>
   );
};

export default memo(Main);
