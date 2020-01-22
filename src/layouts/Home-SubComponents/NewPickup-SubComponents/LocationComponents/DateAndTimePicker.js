import React, { useState, memo } from 'react';
import { Platform } from 'react-native';
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

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleIoSConfirm = date => {
    if (date < props.currentIoSDate) {
      props.dateAlert()
    } else {
      props.setIoSDate(date);
      hideDatePicker();
    }
  };

  const handleAndroidDate = date => {
    if (date < props.currentAndroidDate) {
      props.dateAlert()
    } else {
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
          value={props.currentIoSDate}
          mode="datetime"
          display="default"
          onConfirm={handleIoSConfirm}
          onCancel={hideDatePicker}
        />
      )}

      {props.currentAndroidDate === null && (
        <DateTimePickerModal
          isVisible={true}
          value={new Date()}
          mode={mode}
          display="spinner"
          onConfirm={handleAndroidDate}
          onCancel={hideDatePicker}
        />
      )}

      {props.rideAndroidTime === null && (
        <DateTimePickerModal
          isVisible={true}
          value={new Date()}
          mode={mode}
          datePickerMode
          display="clock"
          onConfirm={handleAndroidTime}
          onCancel={hideDatePicker}
        />
      )}
    </>
  )
}

export default memo(DateAndTimePicker); 