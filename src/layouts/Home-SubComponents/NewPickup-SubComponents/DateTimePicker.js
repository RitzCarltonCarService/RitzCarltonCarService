import React, {Component} from 'react';
import {View, Button, Platform} from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateTimePicker = props => {
  const [selectedDate, setDate] = useState('');
  
  // Mode boolean triggers between show time and show date selection in Date Picket
  const [mode, setMode] = useState('');

  // Boolean to indicate what platform the app is running on
  // const [platform, setPlatform] = useState(true);

  const selectADate = (event, date) => {
    date = date || new Date();

    if (Platform.OS === 'ios') {
      setPlatform(false);
      props.updateDate(date);
    }
  }

  const show = (selectedMode) => {
    setMode(selectedMode);
  }

  return (
      <View>
        <View>
          <Button onPress={show('date')} title="Show date picker!" />
        </View>
        <View>
          <Button onPress={show('time')} title="Show time picker!" />
        </View>
        { show && <DateTimePicker 
            value={new Date()}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={selectADate()} />
        }
      </View>
  )
}