import React, { memo, useState, useEffect } from "react";
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from "react-native";
import TheWhiteSquare from '../../components/TheWhiteSquare';
import { render } from "react-dom";
import { appointments } from "./dummyData";
import { CalendarList, Agenda } from 'react-native-calendars';
import Logo from "../../components/Logo";
import Header from "../../components/Header";

const formatData = function (data) {
  let pickups = [];

  //extract pickups from availabilities

  for (let i = 0; i < data.length; i++) {
    const availability = data[i].pickups;

    for (let j = 0; j < availability.length; j++) {
      if (availability[j].id) {
        pickups.push(availability[j]);
      }
    }
  }

  return pickups;
}

const formatDate = function (date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate() + 1;

  if (month < 10) {
    month = "0" + month;
  }

  if (day < 10) {
    day = "0" + day;
  }

  return year + "-" + month + "-" + day;
}

const createSkeleton = function (data) {
  let today = new Date();
  today = new Date(today.getTime() + 8.64e7);
  console.log("TWO DAYS AGO: "+ today);
  console.log(today);
  let date = formatDate(today);
  console.log("FIRST DATE SHOWN: " + date);
  let lastDate = new Date(data[data.length - 1].estimatedStartTime);
  lastDate = new Date(lastDate.getTime() + (8.64e7 * 30));
  lastDate = formatDate(lastDate);


  let skeleton = {};

  for (let i = 0; i < data.length; i++) {
    if (!skeleton[data[i].estimatedStartTime.split("T")[0]]) {
      skeleton[data[i].estimatedStartTime.split("T")[0]] = [];
    }
    skeleton[data[i].estimatedStartTime.split("T")[0]].push(data[i]);
  }

  date = date.split("T")[0]

  date = new Date(date);

  let dateString = formatDate(date);

  let dateArray = dateString.split("-");
  dateArray[1] = Number(dateArray[1]);
  dateArray[2] = Number(dateArray[2]);

  let monthObject = {
    31: {
      1: true,
      3: true,
      5: true,
      7: true,
      8: true,
      10: true,
      12: true
    },
    30: {
      4: true,
      6: true,
      9: true,
      11: true
    },
    28: {
      2: true
    }
  }

  const changeMonth = function(dateArray) {
    dateArray[2] = 1;
    dateArray[1]++;
    if (dateArray[1] === 13) {
      dateArray[0]++;
      dateArray[1] = 1
    }
  }

  for (let i = 0; i < 30; i++) {

    let year = dateArray[0];
    let month = dateArray[1];
    let day = dateArray[2];

    if (month < 10) {
      month = "0" + month;
    }

    if (day < 10) {
      day  = "0" + day;
    }

    dateString = year + "-" + month + "-" + day;
    if (!skeleton[dateString]){
      skeleton[dateString] = [];
    }

    dateArray[2]++;

    if (monthObject["31"][dateArray[1]] && dateArray[2] === 32) {
      changeMonth(dateArray);
    } else if (monthObject["30"][dateArray[1]] && dateArray[2] === 31) {
      changeMonth(dateArray);
    } else if (monthObject["28"][dateArray[1]] && dateArray[2] === 30 && dateArray[0] % 4 === 0) {
      changeMonth(dateArray);
    } else if (monthObject["28"][dateArray[1]] && dateArray[2] === 29 && dateArray[0] % 4 !== 0) {
      changeMonth(dateArray);
    }
  }

  return skeleton;
}

const DriveSched = props => {

   let pickups = formatData(props.shifts);
   pickups.sort((a, b) => {return new Date(a.estimatedStartTime) - new Date(b.estimatedStartTime)});

   const skeleton = createSkeleton(pickups);

   const formatTime = function (datetime) {
     let hours = datetime.getHours();
     let minutes = datetime.getMinutes();
     let ampm = "AM";

     if (hours > 11) {
       ampm = "PM";
       hours -= 12;
     }

     if (hours === 0) {
       hours = 12;
     }

     return hours + ":" + minutes + " " + ampm;
   }

   return (
      <>
         <View>
          <TheWhiteSquare width={200} height={200} top={-5}>
            <Logo top={50} marginBottom={50}/>
            <Header>Driver Schedule</Header>
            <Agenda
              style={styles.sched}
              items={skeleton}
              //loadItemsForMonth={this.loadItems.bind(this)}
              selected={() => {
                let date = new Date();
                date.setDate(date.getDate() - 1);
                return formatDate(date);
              }}
              renderItem={(item) => {
                return (
                <View style={[styles.item, {height: 130}]}>
                  <Text>
                    <Text><Text style={styles.bold}>Pickup:</Text><Text style={styles.location}>{` ${formatTime(new Date(item.estimatedStartTime))}` + "\n"}</Text></Text>
                    <Text>{`${item.startAddress}` + "\n"}</Text>
                    <Text><Text style={styles.bold}>Dropoff:</Text><Text style={styles.location}>{` ${formatTime(new Date(item.estimatedEndTime))}` + "\n"}</Text></Text>
                    <Text>{`${item.endAddress}` + "\n"}</Text>
                  </Text>
                </View>
              );}}
              renderEmptyDate={() => {return (<View />);}}
              rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
              pastScrollRange={2}
              futureScrollRange={5}
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

const mapStateToProps = state => {
  return {
    shifts: state.shifts
  }
}

export default connect(mapStateToProps, null)(DriveSched);