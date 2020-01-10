import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../../redux/actions';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import Button from '../../../components/Button';

const PickupEntry = props => {

    let from = props.data.from;
    let to = props.data.to;
    let time = props.data.time;

    if (from.length > 49) {
        from = from.substring(0, 46) + "..."
    }

    if (to.length > 49) {
        to = to.substring(0, 46) + "..."
    }

    if (time.length > 49) {
        time = time.substring(0, 46) + "..."
    }

    console.log(props.data)

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    From: {from}
                </Text>
                <Text style={styles.text}>
                    To: {to}
                </Text>
                <Text style={styles.text}>
                    Time: {time}
                </Text>
            </View>
            <View>
                <Image
                    style={{width: 70, height: 50}}
                    source={{url: "https://ritzubercarservice.s3.us-east-2.amazonaws.com/carIcons/mercedes.png"}}
                />
            </View>
        </View>
    )
}

const mapDispatchToProps = {
    navigate: navigate
}

export default connect(null, mapDispatchToProps)(PickupEntry);

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 100
    },
    textContainer: {
        width: "75%"
    },
    text: {
        fontFamily: Platform.OS === "ios" ? "Arial" : "Roboto",
        letterSpacing: 1
    }
})