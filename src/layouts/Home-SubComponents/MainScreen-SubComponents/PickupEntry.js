import React from 'react';
import { connect } from 'react-redux';
import { updateCurrentPickup } from '../../../redux/actions';
import { View, Text, Image, StyleSheet, Platform, TouchableHighlight } from 'react-native';
import Button from '../../../components/Button';
import { theme } from '../../../core/theme';
import dateParser from '../../../components/dateParser';

const PickupEntry = props => {

    let datetime = new Date(props.data.estimatedStartTime).toString().split(" ");

    let from = props.data.startAddress;
    let to = props.data.endAddress;
    let time = datetime[4];
    let date = datetime[0] + " " + datetime[1] + " " + datetime[2] + " " + datetime[3];

    if (from.length > 40) {
        from = from.substring(0, 37) + "...";
    }

    if (to.length > 49) {
        to = to.substring(0, 37) + "...";
    }

    if (time.length > 20) {
        time = time.substring(0, 17) + "...";
    }

    if (date.length > 20) {
        date = date.substring(0, 17) + "...";
    }

    console.log(props.data)

    return (
        <TouchableHighlight
            underlayColor={"lightgray"}
        >
            <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    From: {to}
                </Text>
                <Text style={styles.text}>
                    To: {to}
                </Text>
                <Text style={styles.text}>
                    Time: {dateParser.translateTime(time)}
                </Text>
                <Text style={styles.text}>
                    Date: {date}
                </Text>
            </View>
            <View style={styles.rightCol}>
                <Image
                    style={{width: 80, height: 55}}
                    source={{url: "https://ritzubercarservice.s3.us-east-2.amazonaws.com/carIcons/mercedes.png"}}
                />
                <Button
                    style={{
                        width: "100%",
                        marginVertical: 2,
                        borderRadius: 15,
                        backgroundColor: theme.colors.primary
                     }}
                    labelStyle={{
                        fontFamily: Platform.OS === 'ios' ? "Arial" : "Roboto",
                        letterSpacing: 1,
                        fontWeight: "bold",
                        fontSize: 9,
                        lineHeight: 9,
                        color: theme.colors.secondary,
                     }}
                     onPress={() => {
                        props.updateCurrentPickup(props.id);
                        props.setPage("pickup info");
                    }}
                >
                    View
                </Button>
            </View>
            </View>
        </TouchableHighlight>
    )
}

const mapDispatchToProps = {
    updateCurrentPickup: updateCurrentPickup
}

export default connect(null, mapDispatchToProps)(PickupEntry);

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 100,
        marginBottom: 10
    },
    textContainer: {
        width: "70%"
    },
    text: {
        fontFamily: Platform.OS === "ios" ? "Arial" : "Roboto",
        letterSpacing: 1
    },
    rightCol: {
        alignItems: "center"
    }

})
