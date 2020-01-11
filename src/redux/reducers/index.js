import { combineReducers } from 'redux';
import navigateReducer from './navigateReducer';
import scheduledPickupsReducer from './scheduledPickupsReducer';
import currentPickupReducer from './currentPickupReducer';

const rootReducer = combineReducers({
   nav: navigateReducer,
   scheduledPickups: scheduledPickupsReducer,
   currentPickup: currentPickupReducer
});

export default rootReducer;