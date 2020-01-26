import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import Header from '../../components/Header';
import Button from '../../components/Button';
import MenuButton from '../../components/MenuButton';
import Paragragph from '../../components/Paragraph';

const Main = ({ _handleRequestPickup, _handleViewProfile, userData }) => {
   const styles = StyleSheet.create({
      menuButton: {
         position: 'relative',
      },
   });

   return (
      <>
         <MenuButton
            icon={'account'}
            color={'white'}
            size={80}
            top={0}
            style={styles.menuButton}
            onPress={_handleViewProfile}
         />

         <Paragragph>{`Welcome, ${userData.displayName}`}</Paragragph>

         <Button
            mode={'text'}
            style={{
               borderWidth: 0,
               borderColor: 'black'
            }}
            onPress={_handleViewProfile}
         >View Profile</Button>

         <Header style={{ color: '#FFFFFF' }} onPress={_handleRequestPickup}>{`Request Pick-up`}</Header>
         <Header style={{ color: '#FFFFFF' }}>{`Ride History`}</Header>
         <Header style={{ color: '#FFFFFF' }}>{`Settings`}</Header>
         <Header style={{ color: '#FFFFFF' }}>{`Help`}</Header>
      </>
   );
};

export default memo(Main);
