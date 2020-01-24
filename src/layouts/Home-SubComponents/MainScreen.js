import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateScheduledPickups } from '../../redux/actions';
import { View, Text, StyleSheet, Platform } from 'react-native';
import EntryListView from './MainScreen-SubComponents/EntryListView';
import TheWhiteSquare from '../../components/TheWhiteSquare';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import dummyData from '../../dummyData/dummy_pickup_data';

const MainScreen = props => {

    return (
        <>
            <TheWhiteSquare>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        Scheduled Pickups:
                    </Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.mainContainer}>
                    {props.scheduledPickups.length > 0 ?
                        <EntryListView scheduledPickups={props.scheduledPickups} setPage={props.setPage} />
                        :
                        <Text style={styles.noRequestsNotification}>
                            No Current Requests
                    </Text>
                    }
                </View>
                <View style={styles.logoContainer}>
                    <Logo style={{ width: 80, height: 80 }} />
                </View>
            </TheWhiteSquare>
            <View style={styles.buttonContainer}>
                <Button onPress={() => { props.setPage("new pickup"); props.setScheduled(false) }} mode={"contained"}>
                    Request a Ride Now
                </Button>
                <Button onPress={() => {
                        // axios.post("http://ritzcarservice.us-east-2.elasticbeanstalk.com/api/signup", {
                        //     id: "12",
                        //     name: "Fred",
                        //     email: "fred@fred.fred",
                        //     type: "resident",
                        //     phoneNumber: "a number",
                        //     hotelId: 1
                        // })
                        //     // method: "POST",
                        //     // body: JSON.stringify({
                        //     //     id: "5",
                        //     //     name: "Fred",
                        //     //     email: "fred@fred.fred",
                        //     //     type: "resident",
                        //     //     phoneNumber: "a number",
                        //     //     hotelId: 1
                        //     // })
                        // //})
                        // .then((data) => {
                        //     console.log(data.data);
                        //     props.updateScheduledPickups(dummyData);
                        // })
                        // .catch((err) => {
                        //     console.log(err);
                        // })

                        // Setting page to 'new pickup' request and 'scheduled' to true (for scheduled ride)
                        props.setPage("new pickup")
                        props.setScheduled(true)
                    }} mode={"contained"}>
                    Schedule a Ride
                </Button>
            </View>
        </>
    )
}

const mapStateToProps = state => {
    return {
        scheduledPickups: state.scheduledPickups
    }
}

const mapDispatchToProps = {
    updateScheduledPickups: updateScheduledPickups
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

const styles = StyleSheet.create({
    titleContainer: {
        width: "100%",
        height: "30%",
        alignItems: "center"
    },
    title: {
        fontFamily: Platform.OS === 'ios' ? "Arial" : "Roboto",
        fontSize: 25,
        letterSpacing: 2,
        top: "60%"
    },
    divider: {
        borderBottomColor: "black",
        borderBottomWidth: 1,
        width: "100%",
        marginBottom: 10
    },
    mainContainer: {
        width: "100%",
        height: "60%",
        alignItems: "center"
    },
    noRequestsNotification: {
        fontFamily: Platform.OS === "ios" ? "Arial" : "Roboto",
        color: "gray",
        letterSpacing: 2,
        top: "20%"
    },
    logoContainer: {
        height: "25%"
    },
    buttonContainer: {
        top: "20%",
        width: "80%"
    }
})