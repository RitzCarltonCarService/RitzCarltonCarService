import React from 'react';
import { StyleSheet } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Login_Signup from './Components/Login-Signup/Login-Signup';
import rootReducer from './redux/reducers';

let store = createStore(rootReducer);

export default function App() {
   return (
      <Provider store={store}>
         <Login_Signup />
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
