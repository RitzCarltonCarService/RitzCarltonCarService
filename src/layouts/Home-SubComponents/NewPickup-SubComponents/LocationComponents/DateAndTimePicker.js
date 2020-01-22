import React, { memo } from 'react';
import { Platform, View, Text, TouchableOpacity } from 'react-native';
import { Appearance, getColorScheme } from 'react-native-appearance';
import Button from '../../../../components/Button';
import styled from 'styled-components';
import DateTimePicker from '@react-native-community/datetimepicker';

const colorScheme = Appearance.getColorScheme();

const Container = styled.TouchableOpacity`
  background-color: ${Platform.OS === 'ios' ? '#00000066' : 'transparent'};
  text-align: center;
  width: 200%;
  height: 100%;
  margin-bottom: 100%;
`;

const Header = styled.View`
  width: 100%;
  padding-left: 45%;
  text-align: center;
  background-color: white;
  border-color: grey;
`;

const DateAndTimePicker = props => {

  return ( 
    <Container>

      {Platform.OS === 'ios' && (
        <DateTimePicker
          value={props.currentDate}
          mode="datetime"
          display="default"
          customStyles={{
            datePicker: {
              backgroundColor: colorScheme === "dark" ? "#222" : "white"
            }
          }}
          onChange={(e, d) => {
            if (Platform.OS === 'ios') {
              props.setDate(d);
            } else {
              props.setDate(d);
            }
          }}
          style={{ backgroundColor: 'white' }}
        />
      )}

      {Platform.OS !== 'ios' && (
        <DateTimePicker
          value={props.currentDate}
          mode="datetime"
          display="default"
          customStyles={{
            datePicker: {
              backgroundColor: colorScheme === "dark" ? "#222" : "white"
            }
          }}
          onChange={(e, d) => {
            if (Platform.OS === 'ios') {
              props.setDate(d);
            } else {
              props.setDate(d);
            }
          }}
          style={{ backgroundColor: 'white' }}
        />
      )}

      {Platform.OS === 'ios' && (
        <Header>
          <Button></Button>
          <Button></Button>
        </Header>
      )}

    </Container>
  )
}

export default memo(DateAndTimePicker); 