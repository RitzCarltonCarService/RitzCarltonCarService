import React from 'react';
import { createStore, applyMiddleware } from "redux";
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import App from './src';
import thunk from "redux-thunk";
import theme from './src/core/theme';
import rootReducer from './src/redux/reducers';

let store = createStore(
   rootReducer,
   applyMiddleware(thunk)
);

export default function Main() {
   return (
      <PaperProvider theme={theme}>
         <ReduxProvider store={store}>
            <App />
         </ReduxProvider>
      </PaperProvider>
   );
};
