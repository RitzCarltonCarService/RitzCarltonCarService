import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../redux/actions';
import { View, Text, Button } from 'react-native';
import TheWhiteSquare from '../../components/TheWhiteSquare';

const MainScreen = props => {

    return (
        <View>
            <TheWhiteSquare>
                <Text>
                    Scheduled Pickups:
                </Text>
                {props.scheduledPickups.length > 0 ? 
                props.scheduledPickups.map(pickup => {
                    return (
                        <Button
                            title={pickup.name}
                            onPress={() => { props.setPage("pickup info") }}
                        />
                    )
                }) :
                <Text>
                    No Current Requests
                </Text>
                }
            </TheWhiteSquare>
            <Button
                title="New Pickup"
                onPress={() => { props.setPage("new pickup") }}
            />
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