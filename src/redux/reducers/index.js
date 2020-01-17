import { combineReducers } from 'redux';
import navigateReducer from './navigateReducer';
import scheduledPickupsReducer from './scheduledPickupsReducer';
import getGeoLocationReducer from './getGeoLocationReducer';
import currentPickupReducer from './currentPickupReducer';
import fromLocationReducer from './fromLocationReducer';
import toLocationReducer from './toLocationReducer';
import userDataReducer from './userDataReducer';

const rootReducer = combineReducers({
   nav: navigateReducer,
   scheduledPickups: scheduledPickupsReducer,
   geoLocation: getGeoLocationReducer,
   currentPickup: currentPickupReducer,
   fromLocation: fromLocationReducer,
   toLocation: toLocationReducer,
   userData: userDataReducer
});

export default rootReducer;