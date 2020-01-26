import React, { memo, useState } from 'react';
import { StyleSheet } from 'react-native';
import MenuButton from '../../components/MenuButton';
import Butter from '../../components/Butter';

const Profile = ({ userData, setUserData, _handleViewProfile }) => {
   const [name, setName] = useState(userData.displayName);
   const [email, setEmail] = useState(userData.email);
   const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
   const [hotel, setHotel] = useState('PLACEHOLDER');

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

         <Butter
            title={'Name'}
            info={name}
            endpoint={'/api/setName'}
            uid={userData.uid}
            objKey={'name'}
            setUserData={setUserData}
            setInfo={setName}
         />

         <Butter
            title={'Email'}
            info={email}
            endpoint={'/api/setEmail'}
            uid={userData.uid}
            objKey={'email'}
            setUserData={setUserData}
            setInfo={setEmail}
         />

         <Butter
            title={'Phone Number'}
            info={phoneNumber}
            endpoint={'/api/setPhoneNumber'}
            uid={userData.uid}
            objKey={'phoneNumber'}
            setUserData={setUserData}
            setInfo={setPhoneNumber}
         />

         <Butter
            title={'Hotel'}
            info={hotel}
            endpoint={'/api/setHotel'}
            uid={userData.uid}
            objKey={'hotelId'}
            setUserData={setUserData}
            setInfo={setHotel}
         />
      </>
   );
};

export default memo(Profile);
