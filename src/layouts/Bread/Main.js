import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import Header from '../../components/Header';
import Button from '../../components/Button';
import MenuButton from '../../components/MenuButton';

const Main = ({ _handleRequestPickup, func, ht1, ht2 }) => {
   const styles = StyleSheet.create({
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

         <Button
            mode={'text'}
            style={{
               borderWidth: 0,
               borderColor: 'black'
            }}
            onPress={() => console.log('View Profile')}
         >View Profile</Button>
         {
            ht1 === `Request Pick-up` ?
                  <>
                  <Header style={{ color: '#FFFFFF' }} onPress={_handleRequestPickup}>{`Request Pick-up`}</Header>
                  <Header style={{ color: '#FFFFFF' }}>{`Ride History`}</Header>
                  </>
                  :
                  <>
                  <Header onPress={() => {func(ht1)}} style={{ color: '#FFFFFF' }}>{ht1}</Header>
                  <Header onPress={() => {func(ht2)}} style={{ color: '#FFFFFF' }}>{ht2}</Header>
                  </>
         }
         <Header style={{ color: '#FFFFFF' }}>{`Settings`}</Header>
         <Header style={{ color: '#FFFFFF' }}>{`Help`}</Header>
      </>
   );
};

export default memo(Main);
