import React, { memo } from 'react';
import { Modal, Portal } from 'react-native-paper';
import { View, StyleSheet, Image } from 'react-native'
import { vw } from 'react-native-viewport-units';
import Logo from '../components/Logo';
import TheWhiteBox from '../components/TheWhiteSquare';
import MenuButton from '../components/MenuButton';
import Header from '../components/Header';
import Button from './Button';
import { logoutUser } from '../core/auth-api';

const Bread = ({ visible, onDismiss }) => {
   const styles = StyleSheet.create({
      wrapper: {
         alignItems: 'center',
      }
   });

   return (
      <Portal>
         <Modal visible={visible} onDismiss={onDismiss} >
            <View style={styles.wrapper} >
               <TheWhiteBox
                  width={84}
                  height={100}
                  top={-3}
                  style={{ right: (vw * 8), backgroundColor: '#000000' }}
               >
                  {visible ? <MenuButton icon={'menu-open'} onPress={onDismiss} color={'white'} /> : null}

                  <MenuButton
                     icon={'account'}
                     color={'white'}
                     size={80}
                     top={0}
                     style={{
                        position: 'relative',
                     }}
                  ></MenuButton>

                  <Header style={{ color: '#FFFFFF' }}>{`Request Pick-up`}</Header>
                  <Header style={{ color: '#FFFFFF' }}>{`Ride History`}</Header>
                  <Header style={{ color: '#FFFFFF' }}>{`Settings`}</Header>
                  <Header style={{ color: '#FFFFFF' }}>{`Help`}</Header>

                  <Button mode={'text'} onPress={logoutUser}>Logout</Button>

                  <Image
                     source={require('../../assets/RitzLogoWhite.png')}
                     style={{ width: 128, height: 128, }}
                  />
               </TheWhiteBox>
            </View>
         </Modal>
      </Portal>
   )
};

export default memo(Bread);
