import { combineReducers } from 'redux';
import navigateReducer from './navigateReducer';
import scheduledPickupsReducer from './scheduledPickupsReducer';
import getGeoLocationReducer from './getGeoLocationReducer';

const rootReducer = combineReducers({
   nav: navigateReducer,
   scheduledPickups: scheduledPickupsReducer,
   geoLocation: getGeoLocationReducer
});

export default rootReducer;