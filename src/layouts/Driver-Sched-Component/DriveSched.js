import React, { memo, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import TheWhiteSquare from '../../components/TheWhiteSquare';
import { render } from "react-dom";
import { appointments } from "./dummyData";
import { CalendarList, Agenda } from 'react-native-calendars';
import Logo from "../../components/Logo";
const DriveSched = ({ navigation }) => {
   const [appt, setAppt] = useState(appointments);
   return (
      <>
         <View>
         
          <TheWhiteSquare width={200} height={200} top={-5}>
            <Logo top={50} marginBottom={50}/>
            {/* <CalendarList
              horizontal={true}
              scrollEnabled={true}
              pastScrollRange={0}
              futureScrollRange={1}
            /> */}
            <Agenda
              style={styles.sched}
              items={{
                '2020-01-22': [{}],
                '2020-01-23': [{},{},{},{},{},{},{},{},{},{},{},{},{}],
                '2020-01-24': [],
                '2020-01-25': [{},{}],
                '2020-01-26': [{},{}],
                '2020-01-27': [{},{}],
                '2020-01-28': [{},{}],
                '2020-01-29': [{},{}],
                '2020-01-30': [{},{}],
              }}
              //loadItemsForMonth={this.loadItems.bind(this)}
              //selected={'2020-01-22'}
              renderItem={(item) => {return (<View style={[styles.item, {height: 50}]}><Text>something on the agenda</Text></View>);}}
              renderEmptyDate={() => {return (<View />);}}
              rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
              pastScrollRange={20}
              futureScrollRange={20}
              // markingType={'period'}
              markedDates={{
                 '2020-01-22': {selected: true, marked: true, selectedColor: 'red'},
                 '2020-01-23': {selected: true, marked: true, selectedColor: 'lime'},
                 '2020-01-25': {selected: true, marked: true},
                 '2020-01-26': { marked: true, dotColor: 'red'},
                 '2020-01-27': { marked: true},
                 '2020-01-28': { marked: true},
                 '2020-01-29': { marked: true},
                 '2020-01-30': { marked: true},
              }}
              // monthFormat={'yyyy'}
              // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
              //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
              // hideExtraDays={false}
            />
            
          </TheWhiteSquare>
         </View>
      </>
   );
};

const styles = StyleSheet.create({
  sched: {
      width: 300,
      height: 300,
   },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});

export default memo(DriveSched);