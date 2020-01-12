import { combineReducers } from 'redux';
import navigateReducer from './navigateReducer';
import scheduledPickupsReducer from './scheduledPickupsReducer';
import getGeoLocationReducer from './getGeoLocationReducer';
import currentPickupReducer from './currentPickupReducer';

const rootReducer = combineReducers({
   nav: navigateReducer,
   scheduledPickups: scheduledPickupsReducer,
   geoLocation: getGeoLocationReducer,
   currentPickup: currentPickupReducer
});

export default rootReducer;