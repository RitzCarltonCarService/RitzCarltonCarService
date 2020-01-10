import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../redux/actions';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Title } from 'react-native-paper';
import EntryListView from './MainScreen-SubComponents/EntryListView';
import PickupEntry from './MainScreen-SubComponents/PickupEntry';
import TheWhiteSquare from '../../components/TheWhiteSquare';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';

const { vh, vw } = require('react-native-viewport-units');

const MainScreen = props => {

    return (
        <>
            <TheWhiteSquare>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        Scheduled Pickups:
                    </Text>
                </View>
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
                    <Logo size={80} />
                </View>
            </TheWhiteSquare>
            <View style={styles.buttonContainer}>
                <Button onPress={() => { props.setPage("new pickup")}} mode={"contained"}>
                    Request a Ride Now
                </Button>
                <Button onPress={() => { props.setPage("new pickup")}} mode={"contained"}>
                    Schedule a Ride in Advance
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
    navigate: navigate
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

const styles = StyleSheet.create({
    titleContainer: {
        width: "100%",
        height: "30%",
        alignItems: "center"
    },
    title: {
        fontFamily: Platform.OS === "ios" ? "Arial" : "Roboto",
        fontSize: 25,
        letterSpacing: 2,
        top: "45%"
    },
    mainContainer: {
        width: "100%",
        height: "55%",
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
        top: "25%",
        width: "80%"
    }
})