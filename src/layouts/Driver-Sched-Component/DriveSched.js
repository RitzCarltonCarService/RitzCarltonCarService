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
  let date = data[0].estimatedStartTime;
  let lastDate = data[data.length - 1].estimatedStartTime.split("T")[0];

  let skeleton = {};

  for (let i = 0; i < data.length; i++) {
    if (!skeleton[data[i].estimatedStartTime.split("T")[0]]) {
      skeleton[data[i].estimatedStartTime.split("T")[0]] = [];
    }
    skeleton[data[i].estimatedStartTime.split("T")[0]].push(data[i]);
  }

  date = date.split("T")[0]

while (date !== lastDate) {
    date = new Date(date);
    date.setDate(date.getDate() + 1)

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate() + 1;

    date = formatDate(date);

    if (!skeleton[date]){
      skeleton[date] = [];
    }

  }

  console.log(skeleton);

  return skeleton;
}

const DriveSched = props => {
   let [appt, setAppt] = useState(appointments);
   let [index, setIndex] = useState(-1);

   let pickups = formatData(props.shifts);
   pickups.sort((a, b) => {return new Date(a.estimatedStartTime) - new Date(b.estimatedStartTime)});

   const skeleton = createSkeleton(pickups);

   const formatTime = function (datetime) {
     console.log(datetime);
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
                index++;
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
              pastScrollRange={1}
              futureScrollRange={20}
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