import { ADD_TO_LOCATION } from '../actions';

export default function fromLocationReducer(state = null, action) {
    switch (action.type) {
        case ADD_TO_LOCATION:
           return action.newToLocation;
        default:
           return state;
   }
}