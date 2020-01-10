import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../redux/actions';
import { View, Text, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import TheWhiteSquare from '../../components/TheWhiteSquare';
import Logo from '../../components/Logo';
import Button from '../../components/Button';

const MainScreen = props => {

    return (
        <View>
            <TheWhiteSquare>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        Scheduled Pickups:
                    </Text>
                </View>
                <View style={styles.mainContainer}>
                    {props.scheduledPickups.length > 0 ?
                        props.scheduledPickups.map(pickup => {
                            return (
                                <Button
                                    title={pickup.name}
                                    onPress={() => { props.setPage("pickup info") }}
                                />
                            )
                        }) :
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
                <Button onPress={() => { props.setPage("new pickup") }} mode={"contained"}>
                    Request a Ride Now
                </Button>
                <Button onPress={() => { props.setPage("new pickup") }} mode={"contained"}>
                    Schedule a Ride in Advance
                </Button>
            </View>

        </View>
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
        height: "20%",
        alignItems: "center"
    },
    title: {
        // fontFamily: "Arial",
        fontSize: 25,
        letterSpacing: 2,
        top: "50%"
    },
    mainContainer: {
        width: "100%",
        height: "60%",
        alignItems: "center"
    },
    noRequestsNotification: {
        // fontFamily: "Arial",
        color: "gray",
        letterSpacing: 2,
        top: "20%"
    },
    logoContainer: {
        height: "20%"
    },
    buttonContainer: {
        top: "40%"
    }
})