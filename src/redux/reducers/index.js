import { combineReducers } from 'redux';
import navigateReducer from './navigateReducer';
import isLoggedInReducer from './isLoggedInReducer';

const rootReducer = combineReducers({
   nav: navigateReducer,
   isLoggedIn: isLoggedInReducer,
});

export default rootReducer;