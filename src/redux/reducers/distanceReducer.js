import { ADD_DISTANCE_AMOUNT } from '../actions';

export default function distanceReducer(state = null, action) {
    switch (action.type) {
        case ADD_DISTANCE_AMOUNT:
           return action.newDistance;
        default:
           return state;
   }
}