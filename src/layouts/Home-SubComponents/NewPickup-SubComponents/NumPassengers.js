import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../../redux/actions';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { IconButton, Avatar } from 'react-native-paper';
import TheWhiteSquare from '../../../components/TheWhiteSquare';
import Button from '../../../components/Button';
import {Button as RitzButton} from 'react-native-paper';
// import ScrollWheel from '../../../components/ScrollWheel';

const NumPassengers = props => {
    return (
        <>
            <TheWhiteSquare height={60}>
                <View style={{position: 'absolute', top:'-4%'}}>
                    <IconButton
                        size={70}
                        icon="car"
                        onPress={() => console.log('Car Button')}
                        mode= 'contained'
                    />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title1}>
                        Individual Ride
                    </Text>
                    <View style={styles.border1}></View>
                    <Text style={styles.title}>
                    How many bags of
                    </Text>
                    <Text style={styles.title}>
                    luggage are traveling
                    </Text>
                    <Text style={styles.title}>
                    with you?
                    </Text>
                    <View style={styles.numberSelect}>
                        <IconButton
                            icon="numeric-0" 
                            size={40} 
                            onPress={() => {
                                console.log('ZERO')
                                props.setForm(3)
                            }}
                        />
                        <IconButton
                            icon="numeric-1" 
                            size={40} 
                            onPress={() => {
                                console.log('ONE')
                                props.setForm(3)
                            }}
                        />
                        <RitzButton
                            icon="numeric-2" 
                            style={{height:50}}
                            onPress={() => {
                                console.log('TWO')
                                props.setForm(3)
                            }}
                        />
                        <IconButton
                            icon="numeric-3" 
                            size={40} 
                            onPress={() => {
                                console.log('THREE')
                                props.setForm(3)
                            }}
                        />
                    </View>
                    <View style={styles.border2}></View>
                </View>
                <Button 
                    onPress={() => {props.setForm(3)}} 
                    mode={"contained"}
                    style={styles.requestButton}
                >
                    Request a Ride Now
                </Button>
            </TheWhiteSquare>
            <View style={styles.buttonContainer}>
                <Button 
                    onPress={() => {props.setForm(1)}} 
                    mode={"contained"}
                    // style={styles.requestButton}
                >
                    Back
                </Button>
            </View>
        </>
    )
}

const mapDispatchToProps = {
    navigate: navigate
}

const styles = StyleSheet.create({
    titleContainer: {
        width: "100%",
        height: "30%",
        alignItems: 'center',
    },
    title1: {
        fontFamily: Platform.OS === "ios" ? "Arial" : "Roboto",
        fontSize: 25,
        letterSpacing: 2,
        fontWeight: 'bold',
        top:"-30%",
    },
    title: {
        fontFamily: Platform.OS === "ios" ? "Arial" : "Roboto",
        fontSize: 25,
        letterSpacing: 2,
        top:'0%',
    },
    border1: {
        borderBottomWidth: 1,
        width: '100%',
        top: '-15%',
    },
    border2: {
        borderBottomWidth: 1,
        width: '100%',
        top: '15%',
    },
    buttonContainer: {
        top: "35%",
    },
    requestButton: {
        top:'30%'
    },
    numberSelect: {
        flexDirection: 'row',
        top:'5%',
    }
})

export default connect(null, mapDispatchToProps)(NumPassengers);
