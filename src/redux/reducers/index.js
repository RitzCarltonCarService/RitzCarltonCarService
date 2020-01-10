import { combineReducers } from 'redux';
import navigateReducer from './navigateReducer';
import scheduledPickupsReducer from './scheduledPickupsReducer';

const rootReducer = combineReducers({
   nav: navigateReducer,
   scheduledPickups: scheduledPickupsReducer
});

export default rootReducer;