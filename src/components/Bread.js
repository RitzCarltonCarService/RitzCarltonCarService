import React, { memo } from 'react';
import { View, StyleSheet, Image } from 'react-native'
import { Modal, Portal } from 'react-native-paper';
import { logoutUser } from '../core/auth-api';
import { units } from '../core/untilities';
import Main from '../layouts/Bread/Main';
import Button from './Button';
import MenuButton from '../components/MenuButton';
import Paragragph from '../components/Paragraph';
import TheWhiteBox from '../components/TheWhiteSquare';

const Bread = ({ visible, onDismiss, setPage, navigation, headerOne, headerTwo, func }) => {
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
         right: (units.vw * 8),
         backgroundColor: '#000000'
      },
      image: {
         width: 128,
         height: 128
      },
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

                  <Main _handleRequestPickup={_handleRequestPickup} />

                  <Header onPress={() => {func(headerOne)}} style={{ color: '#FFFFFF' }}>{headerOne}</Header>
                  <Header onPress={() => {func(headerTwo)}} style={{ color: '#FFFFFF' }}>{headerTwo}</Header> 
                  <Header style={{ color: '#FFFFFF' }}>{`Settings`}</Header>
                  <Header style={{ color: '#FFFFFF' }}>{`Help`}</Header>

                  <Button
                     mode={'text'}
                     style={{
                        borderWidth: 0,
                        borderColor: 'black'
                     }}
                     onPress={_handleLogout}
                  >Logout</Button>

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
