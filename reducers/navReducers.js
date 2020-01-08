import { NAVIGATE, TO_HOME } from '../actions/actions';

const initialState = {
    nav: {
        page: "home"
    }
}

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case NAVIGATE:
            return {
                nav: {
                    page: action.page,
                    form: action.form
                }
            }
        case TO_HOME:
            return {
                nav: {
                    page: "home"
                }
            }
        default:
            return state;
    }
}

export default rootReducer;