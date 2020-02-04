import React, { useState, memo } from 'react';
import { Platform, Alert, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Appearance, useColorScheme } from 'react-native-appearance';

const DateAndTimePicker = props => {
  // Checking the dark mode of the phone, and if enabled, override it for iOS
  const colorScheme = Appearance.getColorScheme();

  // Display modes for Android (date/time)
  const [mode, setMode] = useState('date');

  // Date Picket visibility
  const [isDatePickerVisible, setDatePickerVisibility] = useState(true);

   // Change modal's view in screen
  const [modalView, setmodalView] = useState(true);

  const dateAlert = (selectedDate) => {
    let today = new Date();
    if (selectedDate < today) {
        Alert.alert(
            'We\'re Sorry!',
            'Please select a time in the future to schedule your request.',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
          return false
        } else {
          return true
        }
    }

  const hideDatePicker = date => {
    if (date) {
      setDatePickerVisibility(false);
    } else {
      Alert.alert(
        'No Date Selected!',
        'You haven\'t selected a date. Pressing OK will select the current time and date.',
        [
            {text: 'OK', onPress: () => {
              let today = new Date();
              today.setSeconds(today.getSeconds() + 60);

              if (Platform.OS === 'ios') {
                props.changeFrom(true);  
                handleIoSConfirm(today)
              } else if (Platform.OS === 'android') {
                props.changeFrom(true);
                handleAndroidDate(today)
              }
            }} 
        ],
        {cancelable: false},
      );
    }
  };

  const handleIoSConfirm = date => {
    if (dateAlert(date)) {
      props.setIoSDate(date);
      hideDatePicker(date);
    }
  };

  const handleAndroidDate = date => {
    console.log("This is the date: ", date)
    if (dateAlert(date)) {
      props.setAndroidDate(date);
      hideDatePicker(date);
    }
  };

  return ( 
    <View>
      {Platform.OS === 'ios' && (
        <DateTimePickerModal
          headerTextIOS="Pick a date & time"
          cancelTextIOS="Cancel"
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleIoSConfirm}
          onCancel={hideDatePicker}
        />
      )}

      {Platform.OS === 'android' && (
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleAndroidDate}
          onCancel={hideDatePicker}
        />
      )}
    </View>
  )
}

export default memo(DateAndTimePicker); 