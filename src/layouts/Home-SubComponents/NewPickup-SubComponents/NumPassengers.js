import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../../redux/actions';
import { View } from 'react-native';
import DescribeRide from '../../../components/DescribeRide';

const RideShareQuestion = (props) => {
    let title ="Individual Ride" //String 1 "individual Ride"
    let header1 ="How many" //String 2 "how many"
    let header2 ="passengers are"//string 3 "passengers are"
    let header3 ="traveling with you?"//string 4 "traveling with you"
    let nextForm = 3// props.setForm(3)
    let previousForm = 1//back button props.setForm(1)

    return (
        <View>
            <DescribeRide 
                title={title}
                header1={header1}
                header2={header2}
                header3={header3}
                setForm={props.setForm}
                nextForm={nextForm}
                previousForm={previousForm}
            />
        </View>
    )
}

const mapDispatchToProps = {
    navigate: navigate
}

export default connect(null, mapDispatchToProps)(RideShareQuestion);