import React, { memo, useState } from 'react';
import { TouchableOpacity, Platform, Text } from 'react-native';
import { Appearance, getColorScheme } from 'react-native-appearance';
import styled from 'styled-components';
import DateTimePicker from '@react-native-community/datetimepicker';

const colorScheme = Appearance.getColorScheme();

const Container = styled.TouchableOpacity`
  background-color: ${Platform.OS === 'ios' ? '#00000066' : 'transparent'};
  width: 100%;
  height: 100%;
`;

const Header = styled.View`
  width: 100%;
  background-color: white;
  border-color: grey;
`;

const DateAndTimePicker = props => {

  return ( 
    <Container onPress={props.setTimePicker(false)}>
      {Platform.OS === 'ios' && (
        <Header>
          <TouchableOpacity onPress={props.setTimePicker(false)}>
            <Text>Done</Text>
          </TouchableOpacity>
        </Header>
      )}

      <DateTimePicker
        value={props.currentDate}
        mode="date"
        display="default"
        customStyles={{
          datePicker: {
            backgroundColor: colorScheme === "dark" ? "#222" : "white"
          }
        }}
        onChange={(e, d) => {
          if (Platform.OS === 'ios') {
            props.updateDate(d);
          } else {
            props.updateDate(d);
          }
        }}
        style={{ backgroundColor: 'white' }}
      />
    </Container>
  )
}

export default memo(DateAndTimePicker); 