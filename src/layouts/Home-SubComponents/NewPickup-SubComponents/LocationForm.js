import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../../redux/actions';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import TextInput from '../../../components/TextInput.js'
import Button from '../../../components/Button.js'
import { GoogleAutoComplete } from 'react-native-google-autocomplete'

const LocationForm = props => {

    const [toFormFocused, setToFormFocused] = useState(false);
    const [results1, setResults1] = useState([]);
    const [results2, setResults2] = useState([]);
    const [focusedThing, setFocusedThing] = useState(0);
    // const [fromFormFocused, fromFormFocused] = useState(false);

    // useEffect(() => {
    //     console.log("THIS IS RESULTS" + results);
    // }, [results])

    return (
        // <View>
        //     <TextInput
        //         style={styles.inputTo}
        //         placeholder='Current Location'
        //         label='To:' />
        //     <TextInput style={styles.inputFrom} label='From:' onFocus={() => {setFromFormFocused(true)}} onBlur={()=>{setFromFormFocused(false)}}/>
        //     <TextInput style={styles.inputTime} label='Date:' />
        //     <Button
        //         style={styles.confirmButton}
        //         onPress={() => { props.setForm(1); }}
        //     >
        //         Confirm
        //     </Button>
        //     <Button style={styles.backButton}>Back</Button>


        //     {toFormFocused ??
        //         (<View>

        //         </View>)
        //     }

        //     {fromFormFocused ?? 
        //         (<View>

        //         </View>)
        //     }

        // </View>
        <React.Fragment>
        <GoogleAutoComplete apiKey="AIzaSyBpktIvH-LC6Pwrp0ShC7NbjH5AqoySf8s" debounce={300}>
      {({ inputValue, handleTextChange, locationResults, fetchDetails }) => (
        <React.Fragment>
            {setResults1(locationResults)}
          <TextInput
            style={{
              height: 40,
              width: 300,
              borderWidth: 1,
              paddingHorizontal: 16
            }}
            value={inputValue}
            onFocus={() => {setFocusedThing(1)}}
            onChangeText={handleTextChange}
            placeholder="Location..."
          />
          {/* <View style={{top: 200}}>
              {console.log(locationResults.length)}
              {locationResults.map((el, i) => {
                  console.log(i);
                  return (
                      <Text>i</Text>
                  )
              })}
          </View> */}
        </React.Fragment>
      )}
    </GoogleAutoComplete>
    <GoogleAutoComplete apiKey="AIzaSyBpktIvH-LC6Pwrp0ShC7NbjH5AqoySf8s" debounce={300}>
      {({ inputValue, handleTextChange, locationResults, fetchDetails }) => (
        <React.Fragment>
            {setResults2(locationResults)}
          <TextInput
            style={{
              height: 40,
              width: 300,
              borderWidth: 1,
              paddingHorizontal: 16,
            }}
            onFocus={() => {setFocusedThing(2)}}
            value={inputValue}
            onChangeText={handleTextChange}
            placeholder="Location..."
          />
          {/* <View style={{top: 200}}>
              {console.log(locationResults.length)}
              {locationResults.map((el, i) => {
                  console.log(i);
                  return (
                      <Text>i</Text>
                  )
              })}
          </View> */}
        </React.Fragment>
      )}
    </GoogleAutoComplete>

<ScrollView style={{ maxHeight: 100, top: 200 }}>
    {focusedThing === 1 ?
    results1.map((el, i) => (
        <Text>{el.description}</Text>
    )) :
    results2.map((el, i) => (
        <Text>{el.description}</Text>
    ))}
{/* {results.map((el, i) => (
//   <LocationItem
//     {...el}
//     fetchDetails={fetchDetails}
//     key={String(i)}
//   />
<Text>{el.description}</Text>
))} */}
</ScrollView>

</React.Fragment>
    )
}

const styles = StyleSheet.create({
    inputTo: {
        width: '300%',
        alignSelf: 'center'
    },
    inputFrom: {
        width: '300%',
        alignSelf: 'center'
    },
    inputTime: {
        width: '300%',
        alignSelf: 'center',
        marginBottom: '200%'
    },
    confirmButton: {
        width: '300%',
        alignSelf: 'center'
    },
    backButton: {
        width: '300%',
        alignSelf: 'center'
    }
});

const mapDispatchToProps = {
    navigate: navigate
}

export default connect(null, mapDispatchToProps)(LocationForm);