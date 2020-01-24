import React, { useState } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../redux/actions';
import CancelModal from './CancelModal';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Modal, Portal, Provider } from 'react-native-paper'
import Button from '../../components/Button';
import { theme } from '../../core/theme';
const { vh, vw } = require('react-native-viewport-units');

const PrePickupInfo = props => {
    
    let [modalOpen, setModalOpen] = useState(false)

    const pickup = props.scheduledPickups[props.currentPickup];

    return (
        <>
            <View style={styles.statusContainer}>
                <Text style={styles.bannerText}>
                    Ride Scheduled For: {pickup.date}
                </Text>
            </View>

            <View style={styles.pickupTimeContainer}>
                <Text style={styles.bannerText}>
                    Departure Time:  {pickup.time}
                </Text>
            </View>

            <View style={styles.contactButtonPosition}>
                <Button style={styles.contactButton} labelStyle={styles.contactButtonText}>
                    <Text>
                        Contact Driver
                    </Text>
                </Button>
            </View>

            <Button
                style={styles.cancelButton}
                labelStyle={styles.cancelButtonText}
                onPress={() => {setModalOpen(true)}}
            >
                Cancel Request
            </Button>

            <View style={styles.buttonContainer}>
                <Button onPress={() => { props.setPage("home") }}>
                    Back
                </Button>
            </View>

            <Provider>
                <Portal>
                    <Modal
                        visible={modalOpen}
                    >
                        <CancelModal setModalOpen={setModalOpen} setPage={props.setPage}/>
                    </Modal>
                </Portal>
            </Provider>

        </>
    )
}

const mapStateToProps = state => {
    return {
        scheduledPickups: state.scheduledPickups,
        currentPickup: state.currentPickup
    }
}

const mapDispatchToProps = {
    navigate: navigate
}

export default connect(mapStateToProps, mapDispatchToProps)(PrePickupInfo);

const styles = StyleSheet.create({
    statusContainer: {
        width: 100 * vw,
        height: 4 * vh,
        top: 12 * vh,
        backgroundColor: theme.colors.accentSecondary,
        alignItems: "center",
        justifyContent: "center"
    },
    pickupTimeContainer: {
        width: 100 * vw,
        height: 4 * vh,
        top: 14 * vh,
        backgroundColor: theme.colors.accentSecondary,
        alignItems: "center",
        justifyContent: "center"
    },
    bannerText: {
        fontFamily: Platform.OS === "ios" ? "Arial" : "Roboto",
        color: theme.colors.secondary,
        fontSize: 22,
        letterSpacing: 2
    },
    contactButtonPosition: {
        width: 80 * vw,
        height: 5 * vh,
        top: 14 * vh
    },
    contactButton: {
        width: "100%",
        height: "100%",
        backgroundColor: theme.colors.primary,
    },
    contactButtonText: {
        fontFamily: Platform.OS === 'ios' ? "Arial" : "Roboto",
        letterSpacing: 2,
        fontWeight: "bold",
        fontSize: 15,
        lineHeight: 28,
        color: theme.colors.secondary,
    },
    bottomContainer: {
        width: 94 * vw,
        height: 15 * vh,
        borderRadius: 10,
        top: 62 * vh,
        backgroundColor: theme.colors.secondary,
        alignItems: "center"
    },
    cancelButton: {
        width: 94 * vw,
        backgroundColor: "red",
        borderRadius: 10,
        height: 8 * vh,
        top: 60 * vh
    },
    cancelButtonText: {
        fontFamily: Platform.OS === 'ios' ? "Arial" : "Roboto",
        letterSpacing: 2,
        fontWeight: "bold",
        fontSize: 24,
        lineHeight: 50,
        color: theme.colors.secondary,
    },
    driverInfo: {
        flex: 1,
        flexDirection: "row"
    },
    driverPic: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    driverName: {
        flex: 4,
        alignItems: "center"
    },
    buttonContainer: {
        top: 58 * vh,
        width: 94 * vw
    },
    backButton: {
        borderRadius: 10,
        backgroundColor: theme.colors.primary,
    }
})