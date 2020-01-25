import axios from 'axios';
import React from 'react';
import Moment from 'moment';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton, Button as AccountButton } from 'react-native-paper';
import { State } from 'react-native-gesture-handler';
import TheWhiteSquare from '../../components/TheWhiteSquare';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import dateParser from '../../components/dateParser';

const { vw, vh } = require('react-native-viewport-units');

const DetailsModal = props => {

    return (
        <View style={styles.outerContainer}>
            <TheWhiteSquare height={60}>
                <View style={styles.requestScreen}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            Pickup Details
                        </Text>
                        <View style={styles.divider} />
                    </View>
                    <View style={styles.descriptor}>
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>Date: </Text>
                            <Text>{dateParser.getDateFromDate(props.pickup.estimatedStartTime)}</Text>
                        </Text>
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>Departure Time: </Text>
                            <Text>{dateParser.getTimeFromDate(props.pickup.estimatedStartTime)}</Text>
                        </Text>
                        <Text style={{ fontWeight: "bold" }}>Estimated Arrival Time: </Text>
                            <Text>{dateParser.getTimeFromDate(props.pickup.estimatedEndTime)}</Text>
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>Pick-Up Location: </Text>
                            <Text>{props.pickup.startAddress}</Text>
                        </Text>
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>Destination: </Text>
                            <Text>{props.pickup.endAddress}</Text>
                        </Text>
                    </View>
                    <View style={styles.carAndDriver}>
                        <IconButton icon="car" size={50} color="black"></IconButton>
                        <View>
                            <Text style={{ fontWeight: "bold" }}>Your Car: </Text>
                            <Text>
                                <Text style={{ fontWeight: "bold" }}>Mercedes: </Text> A-Class Subcompact Luxury Hatchback/Sedan
                            </Text>
                        </View>
                    </View>
                    <View style={styles.carAndDriver}>
                        <IconButton icon="account" size={50} color="black"></IconButton>
                        <View style={{ marginTop: "5%" }}>
                            <Text style={{ fontWeight: "bold" }}>Your Driver: </Text>
                            <Text>John Doe</Text>
                        </View>
                    </View>
                    <View style={styles.logoBox}>
                        <Logo style={{ height: 80, width: 80 }} />
                    </View>
                    <View style={styles.logoContainer}>
                        <Button
                            onPress={() => {
                                props.setDetailsOpen(false);
                            }}
                        >
                            Back
                        </Button>
                    </View>
                </View>
            </TheWhiteSquare>
        </View>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        height: "100%",
        width: "100%",
        bottom: 20 * vh,
        alignItems: "center",
        justifyContent: "center"
    },
    requestScreen: {
        width: "100%",
        alignContent: "center",
        top: "5%",
    },
    titleContainer: {
        width: "100%",
        alignItems: "center",
    },
    title: {
        fontFamily: Platform.OS === 'ios' ? "Arial" : "Roboto",
        fontSize: 25,
        letterSpacing: 2,
        top: "12%",
    },
    divider: {
        borderBottomColor: "black",
        borderBottomWidth: 1,
        width: "100%",
        top: "15%",
    },
    descriptor: {
        fontFamily: Platform.OS === 'ios' ? "Arial" : "Roboto",
        fontSize: 14,
        letterSpacing: 2,
        flexDirection: 'column',
        alignSelf: 'flex-start',
        top: "3%",
    },
    carAndDriver: {
        flexDirection: "row",
        position: 'relative',
        width: "100%",
        paddingRight: "35%",
        top: "8%",
    },
    logoContainer: {
        width: "100%",
        top: '0%',
        justifyContent: "center",
        alignItems: "center"
    },
    logoBox: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonContainer: {
        top: "18%",
    },
})

const mapStateToProps = state => {
    return {
        nav: state.nav
    }
}

export default connect(mapStateToProps, null)(DetailsModal);


