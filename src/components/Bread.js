import React, { memo } from 'react';
import { View, StyleSheet, Image } from 'react-native'
import { Modal, Portal } from 'react-native-paper';
import { logoutUser } from '../core/auth-api';
import { vw } from 'react-native-viewport-units';
import Header from '../components/Header';
import Button from './Button';
import MenuButton from '../components/MenuButton';
import Paragragph from '../components/Paragraph';
import TheWhiteBox from '../components/TheWhiteSquare';

const Bread = ({ visible, onDismiss, setPage, navigation }) => {
   const styles = StyleSheet.create({
      wrapper: {
         alignItems: 'center',
      },
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

   const _handleViewProfile = () => {

   };

   const _handleLogout = () => {
      onDismiss();
      logoutUser();
   };

   const _handleRequestPickup = () => {
      onDismiss();
      setPage("home");
      navigation.navigate("Dashboard");
   };

   return (
      <Portal>
         <Modal visible={visible} onDismiss={onDismiss} >
            <View style={styles.wrapper} >
               <TheWhiteBox
                  width={84}
                  height={100}
                  top={-3}
                  style={styles.theWhiteBox}
               >
                  {visible ? <MenuButton icon={'menu-open'} onPress={onDismiss} color={'white'} /> : null}

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

                  <Button mode={'text'} onPress={_handleLogout}>Logout</Button>

                  <View style={styles.logoWrapper}>
                     <Image
                        source={require('../../assets/RitzLogoWhite.png')}
                        style={styles.image}
                     />

                     <Paragragph style={styles.paragragph}>The Ritz Carlton Residences</Paragragph>
                  </View>
               </TheWhiteBox>

            </View>
         </Modal>
      </Portal>
   )
};

export default memo(Bread);
