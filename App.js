import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Home from './components/Home.js';
import rootReducer from './reducers/navReducers.js';

let store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
        <Text>
          Stuff be happening
        </Text>
        <Home />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
