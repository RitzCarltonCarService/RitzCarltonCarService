import React, { useState, memo } from 'react';
import { Platform, Alert } from 'react-native';
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
    console.log("This is the selectedDate: ", selectedDate);
    let today = new Date();
    console.log("This is the current date of today: ", today)
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
          console.log("The date selected is larger")
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
      hideDatePicker();
      props.setIoSDate(date);
    }
  };

  const handleAndroidDate = date => {
    if (dateAlert(date)) {
      props.setAndroidDate(date);
      setMode('time')
      hideDatePicker();
    }
  };

  const handleAndroidTime = time => {
    props.setAndroidTime(time);
    hideDatePicker();
  };

  return ( 
    <>
      {Platform.OS === 'ios' && (
        <DateTimePickerModal
          headerTextIOS="Pick a date & time"
          cancelTextIOS="Cancel"
          isVisible={isDatePickerVisible}
          mode="datetime"
          display="default"
          onConfirm={handleIoSConfirm}
          onCancel={hideDatePicker}
        />
      )}

      {props.rideAndroidTime === null && (
        <DateTimePickerModal
          isVisible={true}
          mode={mode}
          datePickerMode
          display="clock"
          onConfirm={handleAndroidTime}
        />
      )}

      {/* {props.currentAndroidDate === null && (
        <DateTimePickerModal
          isVisible={true}
          mode={mode}
          display="default"
          onConfirm={handleAndroidDate}
          onCancel={hideDatePicker}
        />
      )} */}

    </>
  )
}

export default memo(DateAndTimePicker); 