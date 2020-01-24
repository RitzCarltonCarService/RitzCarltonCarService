import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../../redux/actions';
import { View } from 'react-native';
import DescribeRide from '../../../components/DescribeRide';

const RideShareQuestion = (props) => {
    let title ="Ride Share" //String 1 "individual Ride"
    let header1 ="Would you be willing" //String 2 "how many"
    let header2 ="to share this ride"//string 3 "passengers are"
    let header3 ="with another Ritz Carlton resident?"//string 4 "traveling with you"
    let nextForm = 4// props.setForm(3)
    let previousForm = 2//back button props.setForm(1)

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
                setField={props.setRideShare}
            />
        </View>
    )
}

const mapDispatchToProps = {
    navigate: navigate
}

export default connect(null, mapDispatchToProps)(RideShareQuestion);