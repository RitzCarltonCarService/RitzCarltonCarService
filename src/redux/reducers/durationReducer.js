import { ADD_DURATION_TIME } from '../actions';

export default function durationReducer(state = null, action) {
    switch (action.type) {
        case ADD_DURATION_TIME:
           return action.newDuration;
        default:
           return state;
   }
}