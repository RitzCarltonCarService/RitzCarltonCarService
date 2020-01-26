import React, { memo, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import TheWhiteSquare from '../../components/TheWhiteSquare';
import { render } from "react-dom";
import { appointments } from "./dummyData";
import { CalendarList, Agenda } from 'react-native-calendars';
import Logo from "../../components/Logo";
import Header from "../../components/Header";

const DriveSched = ({ navigation }) => {
   let [appt, setAppt] = useState(appointments);
   let [index, setIndex] = useState(-1);
   return (
      <>
         <View>
          <TheWhiteSquare width={200} height={200} top={-5}>
            <Logo top={50} marginBottom={50}/>
            <Header>Driver Schedule</Header>
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
              renderItem={(item) => {
                index++;
                if(index === appt.length) index = 0;
                return (
                <View style={[styles.item, {height: 130}]}>
                  <Text>
                    <Text style={styles.bold}>{`${appt[index].title}` + "\n"}</Text>
                    <Text style={styles.location}>{`${appt[index].location}` + "\n"}</Text>
                    <Text><Text style={styles.bold}>Start:</Text>{` ${appt[index].startDate}` + "\n"}</Text> 
                    <Text><Text style={styles.bold}>End:</Text>{` ${appt[index].endDate}` + "\n"}</Text>
                  </Text>
                </View>
              );}}
              renderEmptyDate={() => {return (<View />);}}
              rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
              pastScrollRange={20}
              futureScrollRange={20}
              // markingType={'period'}
              markedDates={{
                 '2020-01-22': {selected: true, marked: true, selectedColor: 'red'},
                 '2020-01-23': {selected: true, marked: true, selectedColor: 'lime'},
                 '2020-01-25': {selected: true, marked: true, selectedColor: 'darkviolet'},
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
    backgroundColor: 'gainsboro',
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
  },
  bold: {
    fontWeight: "bold"
  },
  location: {
    color: "dodgerblue",
    fontWeight: "bold"
  }
});

export default memo(DriveSched);