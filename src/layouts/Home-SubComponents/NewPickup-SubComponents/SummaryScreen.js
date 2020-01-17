import React from 'react';
import { connect } from 'react-redux';
import { updateScheduledPickups } from '../../../redux/actions';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton, Button as AccountButton } from 'react-native-paper';
import dummyData from '../../../dummyData/dummy_pickup_data';
import { State } from 'react-native-gesture-handler';
import TheWhiteSquare from '../../../components/TheWhiteSquare';
import Logo from '../../../components/Logo';
import Button from '../../../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';


const SummaryScreen = props => {
    return (
        <>
            <TheWhiteSquare height={70} style={{ borderWidth: 3 }}>
                <View style={styles.requestScreen}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            Your new Pick-up
                    </Text>
                        <Text style={styles.title}>
                            Request:
                    </Text>
                        <View style={styles.divider} />
                    </View>
                    <View style={styles.descriptor}>
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>Date: </Text>
                            XX / XX / XXXX
                    </Text>
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>Pick-Up Location: </Text>
                            123 JONathan street how much will this hold
                    </Text>
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>Destination: </Text>
                            143 Taylor Street Lorem Ipsum super long street name
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
                            <Text>JONathan Keane </Text>
                        </View>
                    </View>
                    <View style={styles.logoContainer}>
                        <Button
                            onPress={() => {
                                props.updateScheduledPickups(dummyData);
                                props.setPage("home");
                            }}
                        >
                            Submit Ride Request
                    </Button>
                    </View>
                    <View style={styles.logoBox}>
                        <Logo style={{ height: 100, width: 100 }} />
                    </View>
                </View>
            </TheWhiteSquare>
            <View style={styles.buttonContainer}>
                <Button onPress={() => { props.setForm(3) }}>
                    Back
                </Button>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
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
    },
    logoBox: {
        alignSelf: "center",
        top: "-5%",
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

const mapDispatchToProps = {
    updateScheduledPickups: updateScheduledPickups
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryScreen);


