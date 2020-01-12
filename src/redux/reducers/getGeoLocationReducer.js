import { GET_CURRENT_LOCATION } from '../actions';

let defaultValue = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
}

export default function getGeoLocationReducer(state = defaultValue, action) {
   switch (action.type) {
      case GET_CURRENT_LOCATION:
         return action.payload;
      default:
         return state;
   }
}