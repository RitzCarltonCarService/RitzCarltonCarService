import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../../redux/actions';
import { View, Text, StyleSheet, Platform } from 'react-native';
import {IconButton, Button as RitzButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TheWhiteSquare from '../../../components/TheWhiteSquare';
import Button from '../../../components/Button';
import Logo from '../../../components/Logo';

const NumPassengers = props => {
    //String 1 "individual Ride"
    //String 2 "how many"
    //string 3 "passengers are"
    //string 4 "traveling with you"
    // props.setForm(3)
    //back button props.setForm(1)

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
                    How many
                    </Text>
                    <Text style={styles.title}>
                    passengers are
                    </Text>
                    <Text style={styles.title}>
                    traveling with you?
                    </Text>
                    <View style={styles.numberSelect}>
                        {[0,1,2,3,4].map((i, index)=> (
                            <RitzButton
                                mode="text"
                                key={index}
                                color='black'
                                style={{marginHorizontal:'-5%'}}
                                onPress={() => {
                                console.log(`${i}`)
                                props.setForm(3)
                                }}
                            >
                                <Icon key={index} size={50} name={`numeric-${i}`}/>
                            </RitzButton>
                        ))}
                    </View>
                    <View style={styles.border2}></View>
                </View>
                <View style={styles.logoBox}>
                    <Logo  style={{height:100, width:100}}/>
                </View>
            </TheWhiteSquare>
            <View style={styles.buttonContainer}>
                <Button 
                    onPress={() => {
                        props.setForm(1)
                        }} 
                    mode={"contained"}
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
        height: "25%",
        alignItems: 'center',
    },
    title1: {
        fontFamily: Platform.OS === "ios" ? "Arial" : "Roboto",
        fontSize: 25,
        letterSpacing: 2,
        fontWeight: 'bold',
        top:"-25%",
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
    },
    logoBox: {
        top:'30%'
    }
})

export default connect(null, mapDispatchToProps)(NumPassengers);
