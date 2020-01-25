import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../../redux/actions';
import { View, Text, Image, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import PickupEntry from './PickupEntry';
import Button from '../../../components/Button';

const EntryListView = props => {

    return (
            <ScrollView bounces={false}>
                    {props.scheduledPickups.map((pickup, index) => {
                        console.log("This is a pick-up: ", pickup)
                        return (
                        // <Button
                        //     title={pickup.name}
                        //     onPress={() => { props.setPage("pickup info") }}
                        // />
                            <PickupEntry
                                data={pickup}
                                setPage={props.setPage}
                                key={index}
                                id={index}
                            />
                        )
                    })}
            </ScrollView>
    )
}

const mapDispatchToProps = {
    navigate: navigate
}

export default connect(null, mapDispatchToProps)(EntryListView);

const styles = StyleSheet.create({
    list: {
        height: "100%"
    }
})