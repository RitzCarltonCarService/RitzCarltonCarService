import { UPDATE_SCHEDULED_PICKUPS } from '../actions';

export default function scheduledPickupsReducer(state = [], action) {
   switch (action.type) {
      case UPDATE_SCHEDULED_PICKUPS:
         return action.scheduledPickups;
      default:
         return state;
   }
}