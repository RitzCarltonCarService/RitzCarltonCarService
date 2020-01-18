import { SET_USER_DATA } from '../actions';

export default function userDataReducer(state = {}, action) {
   switch (action.type) {
      case SET_USER_DATA:
         return action.payload;
      default:
         return state;
   };
};