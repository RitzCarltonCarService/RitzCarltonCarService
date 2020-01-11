import React from 'react';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import { StyleSheet } from 'react-native';
import rootReducer from './src/redux/reducers';
import App from './src';

let store = createStore(
   rootReducer,
   applyMiddleware(thunk)
);

export default function Main() {
   return (
      <Provider store={store}>
         <App />
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
