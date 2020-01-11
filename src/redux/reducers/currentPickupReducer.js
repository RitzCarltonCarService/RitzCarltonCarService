import { UPDATE_CURRENT_PICKUP } from '../actions';

export default function currentPickupReducer(state = null, action) {
    switch (action.type) {
        case UPDATE_CURRENT_PICKUP:
           return action.newPickup;
        default:
           return state;
   }
}