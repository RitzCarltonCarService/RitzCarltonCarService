import { ADD_FROM_LOCATION } from '../actions';

export default function fromLocationReducer(state = null, action) {
    switch (action.type) {
        case ADD_FROM_LOCATION:
           return action.newFromLocation;
        default:
           return state;
   }
}