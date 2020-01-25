import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Button from '../../components/Button';
import { theme } from '../../core/theme';
import TheWhiteSquare from '../../components/TheWhiteSquare';
import Logo from '../../components/Logo';
import getPickups from '../../components/getPickups';
import { updateScheduledPickups } from '../../redux/actions';
import axios from 'axios';

const { vw, vh } = require('react-native-viewport-units');

const CancelModal = props => (
    <View style={styles.outerContainer}>
    <TheWhiteSquare>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>
                Cancel this Pickup Request?
            </Text>
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.text}>
                You cannot undo this action.
            </Text>
        </View>
        <View style={styles.iconContainer}>
            <Logo style={{width: 80, height: 80}} />
        </View>
        <View style={styles.buttonsContainer}>
            <View style={styles.button}>
                <Button
                    onPress={()=>{props.setModalOpen(false)}}
                    style={styles.noButton}
                    // labelStyle={styles.buttonText}
                >
                    No
                </Button>
            </View>
            <View style={styles.button}>
                <Button 
                    onPress={()=>{
                        axios.post('http://ritzcarservice.us-east-2.elasticbeanstalk.com/api/deletePickup', {
                            id: props.id
                        })
                        .then(() => {
                            props.setModalOpen(false);
                            props.setPage("home");
                        })
                        .catch(() => {
                            props.setModalOpen(false);
                            props.setPage("home");
                        })
                        //getPickups(props.userData.uid, updateScheduledPickups);
                    }}
                    style={styles.yesButton}
                    // labelStyle={styles.buttonText}
                >
                    Yes
                </Button>
            </View>
        </View>
    </TheWhiteSquare>
    </View>
)

const styles = StyleSheet.create({
    outerContainer: {
        height: "100%",
        width: "100%",
        bottom: 20 * vh,
        alignItems: "center",
        justifyContent: "center"
    },
    container: {
        height: 30 * vh,
        width: 75 * vw,
        backgroundColor: theme.colors.secondary
    },
    titleContainer: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontFamily: Platform.OS === "ios" ? "Arial" : "Roboto",
        fontSize: 30,
        textAlign: "center",
        letterSpacing: 2
    },
    textContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontFamily: Platform.OS === "ios" ? "Arial" : "Roboto",
        textAlign: "center",
        fontSize: 20,
        letterSpacing: 2
    },
    buttonsContainer: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "row"
    },
    button: {
        flex: 1,
        padding: 5
    },
    yesButton: {
        width: "100%",
        marginVertical: 10,
        backgroundColor: "red",
        borderRadius: 10
    },
    noButton: {
        width: "100%",
        marginVertical: 10,
        backgroundColor: theme.colors.primary,
        borderRadius: 10
    },
    buttonText: {
        fontFamily: Platform.OS === 'ios' ? "Arial" : "Roboto",
        letterSpacing: 2,
        fontWeight: "bold",
        fontSize: 15,
        lineHeight: 40,
        color: theme.colors.secondary,
    },
    iconContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }

})

const mapStateToProps = state => {
    return {
        userData: state.userData
    }
}

const mapDispatchToProps = {
    updateScheduledPickups: updateScheduledPickups
}

export default connect(mapStateToProps, mapDispatchToProps)(CancelModal);
