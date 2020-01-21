import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Surface} from "react-native-paper";
import { theme } from "../../../../core/theme.js";
import Button from '../../../../components/Button';
import DateAndTimePicker from './DateTimePicker.js';

const DateTimeMapView = props => {
    return (
        <View>
            <Surface style={styles.surface}>
                <Button> 
                    Back 
                </Button>
                <TouchableOpacity
                    style={styles.button}
                    // onPress={this.onPress}
                >
                    <Text> Touch Here </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    // onPress={this.onPress}
                >
                    <Text> Touch Here </Text>
                </TouchableOpacity>
            </Surface>
            <View style={styles.buttonContainer}>  
                <DateAndTimePicker 
                    currentDate={currentDate} 
                    setTimePicker={setTimePicker} 
                    dateAlert={dateAlert}     
                />
            </View>
            <View style={styles.singleRideButtonContainer}>
                <Button style={styles.backButton} 
                    mode='contained' 
                    onPress={() => props.setForm(1)}
                >
                    Next
                </Button>
                <Button style={styles.backButton} 
                    mode='contained' 
                    onPress={() => props.setPage("home")}
                >
                    Back
                </Button>
            </View>
            }  
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    surface: {
        flex: 1,
        width: '200%',
        marginTop: '7%',
        maxHeight: '30%',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    fromWrapper: {
        flex: 1,
        width: 325,
        height: '5%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    toWrapper: {
        flex: 1,
        width: 325,
        height: '5%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    scroll: {
        flex: 1,
        width: '100%',
        maxHeight: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    scrollView: {
        height: '50%',
        width: '100%',
        marginHorizontal: '10%',
        maxHeight: '100%',
    },
    buttonContainer: {
        flex: 1,
        maxHeight: '100%',
        width: "100%",
        flexDirection: 'column',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        justifyContent: 'center',
        marginBottom: '10%'
    },
    singleRideButtonContainer: {
        flex: 1,
        maxHeight: '100%',
        width: "100%",
        flexDirection: 'column',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        justifyContent: 'center',
        marginBottom: '10%'
    },
    backButton: {
        maxHeight: "100%",
        width: "100%",
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
        borderRadius: 10
    },
    nextButton: {
        maxHeight: "100%",
        width: "100%",
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
        borderRadius: 10
    },
    text: {
        fontFamily: Platform.OS === 'ios' ? "Arial" : "Roboto",
        letterSpacing: 2,
        fontWeight: "bold",
        fontSize: 15,
        lineHeight: 40,
        color: theme.colors.secondary,
    }
});

export default DateTimeMapView;