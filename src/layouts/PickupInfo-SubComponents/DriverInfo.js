import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../redux/actions';
import { View, Text, Button, StyleSheet } from 'react-native';

const { vw, vh } = require('react-native-viewport-units');

const DriverInfo = props => {
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={styles.driverPic}>
                    <Text>PIC</Text>
                </View>
                <View style={styles.driverName}>
                    <Text>Some driver info goes here</Text>
                </View>
            </View>
            <View style={styles.bottom}>
                <View style={styles.carPic}>
                    <Text>PIC</Text>
                </View>
                <View style={styles.carName}>
                    <Text>Some driver info goes here</Text>
                </View>
            </View>
        </View>
    )
}

const mapStateToProps = state => {
    return {
        currentPickup: state.currentPickup
    }
}

export default connect(mapStateToProps, null)(DriverInfo);

const styles = StyleSheet.create({
    container: {
        flex: 3,
        width: 100 * vw
    },
    top: {
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
    bottom: {
        flex: 1,
        flexDirection: "row"
    },
    carPic: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    carName: {
        flex: 4,
        alignItems: "center"
    }
})