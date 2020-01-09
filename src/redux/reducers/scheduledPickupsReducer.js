import { UPDATE_SCHEDULED_PICKUPS } from '../actions';

export default function scheduledPickupsReducer(state = [], action) {
   switch (action.type) {
      case UPDATE_SCHEDULED_PICKUPS:
         console.log("reducer is working");
         return action.scheduledPickups;
      default:
         console.log("returning default");
         return state;
   }
}