import React, { memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { units } from '../core/untilities';
import Header from './Header';
import Paragragph from './Paragraph';
import MenuButton from './MenuButton';
import TextInput from './TextInput';
import { theme } from "../core/theme";
import axios from 'axios';
import firebase from "firebase/app";
import "firebase/auth";

const Butter = ({ title, info, endpoint, uid, objKey, setUserData, setInfo }) => {
   const [newUserInfo, setNewUserInfo] = useState(info);
   const [inEditMode, toggleEditMode] = useState(false);

   const styles = StyleSheet.create({
      menuButton: {
         position: 'relative',
         top: units.vh * 1,
         left: 0,
      },
      container: {
         width: '100%',
         alignItems: 'flex-start',
      },
      wrapper: {
         flexDirection: 'row',
      },
      header: {
         color: '#FFFFFF',
         marginLeft: units.vw * 3,
      },
      paragragph: {
         marginLeft: units.vw * 5,
      },
      test: {
         backgroundColor: theme.colors.primary,
      }
   });

   const _handleOnPress = () => {
      if (info !== newUserInfo) {
         let data = { id: uid };
         if (objKey === 'name') {
            data.displayName = newUserInfo;
         };
         data[objKey] = newUserInfo;

         axios.post(`http://ritzcarservice.us-east-2.elasticbeanstalk.com${endpoint}`, data)
            .then(() => {
               firebase.auth().currentUser.updateProfile({
                  ...data
               });
               setInfo(newUserInfo);
               setUserData(data);
               toggleEditMode(!inEditMode);
            })
      } else {
         toggleEditMode(!inEditMode);
      };
   };

   return (
      <View style={styles.container}>
         <View style={styles.wrapper}>
            <Header style={styles.header}>{title}</Header>
            <MenuButton
               icon={'pencil'}
               color={'white'}
               style={styles.menuButton}
               onPress={_handleOnPress}
            />
         </View>

         {inEditMode ?
            <TextInput
               returnKeyType='done'
               value={newUserInfo}
               onChangeText={text => setNewUserInfo(text)}
               autoCapitalize='none'
               mode='flat'
               style={styles.test}
               theme={{ colors: { text: '#FFFFFF' } }}
            /> :
            <Paragragph style={styles.paragragph}>{info}</Paragragph>
         }
      </View>
   );
};

export default memo(Butter);
