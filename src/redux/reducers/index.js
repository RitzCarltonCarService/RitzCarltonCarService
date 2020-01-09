import { combineReducers } from 'redux';
import navigateReducer from './navigateReducer';
import isLoggedInReducer from './isLoggedInReducer';
import scheduledPickupsReducer from './scheduledPickupsReducer';

const rootReducer = combineReducers({
   nav: navigateReducer,
   isLoggedIn: isLoggedInReducer,
   scheduledPickups: scheduledPickupsReducer
});

export default rootReducer;