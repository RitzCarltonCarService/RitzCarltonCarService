import { UPDATE_SHIFTS } from '../actions';

const initialState = {
    shifts: null
}

function shiftsReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_SHIFTS:
            return action.newShifts
        default:
            return state;
    }
}

export default shiftsReducer;