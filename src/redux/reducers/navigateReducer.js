import { NAVIGATE, TO_HOME } from '../actions';

const initialState = {
    nav: {
        page: "home"
    }
}

function navigateReducer(state = initialState, action) {
    console.log("nav reducer runs")
    switch (action.type) {
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

export default navigateReducer;