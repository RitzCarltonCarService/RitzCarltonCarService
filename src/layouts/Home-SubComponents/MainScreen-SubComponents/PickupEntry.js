import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../../redux/actions';
import { View, Text, Image } from 'react-native';

const PickupEntry = props => {
    return (
        <View>
            <View>

            </View>
            <View>
                <Image
                    style={{width: 50, height: 50}}
                    source={{url: "https://drive.google.com/open?id=1LaqzOPFPVDPUU4mwaRVh2CzrfpOxUM1M"}}
                />
            </View>
        </View>
    )
}

const mapDispatchToProps = {
    navigate: navigate
}

export default connect(null, mapDispatchToProps)(PickupEntry);