import React, { PureComponent } from 'react';
import { View, Text, Stylesheet } from 'react-native';

class LocationItem extends PureComponent {
    render() {
        return (
            <View>
                <Text>{this.props.description}</Text>
            </View>
        )
    }
}

// const styles = Stylesheet.create({
//     root: {
//         height: 40,
//         borderBottomWidth: Stylesheet.hairlineWidth,
//         justifyContent: 'center'
//     }
// })

export default LocationItem;