import { combineReducers } from 'redux';
import navigateReducer from './navigateReducer';
import scheduledPickupsReducer from './scheduledPickupsReducer';
<<<<<<< HEAD
=======
import getGeoLocationReducer from './getGeoLocationReducer';
>>>>>>> 8408930b4621f75d688f8d43c1ff4646ee2db8bc
import currentPickupReducer from './currentPickupReducer';

const rootReducer = combineReducers({
   nav: navigateReducer,
   scheduledPickups: scheduledPickupsReducer,
<<<<<<< HEAD
=======
   geoLocation: getGeoLocationReducer,
>>>>>>> 8408930b4621f75d688f8d43c1ff4646ee2db8bc
   currentPickup: currentPickupReducer
});

export default rootReducer;