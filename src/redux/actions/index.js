// ----------------------
// Constants
// ----------------------

export const NAVIGATE = "NAVIGATE";
export const TO_HOME = "TO_HOME";
export const UPDATE_SCHEDULED_PICKUPS = "UPDATE_SCHEDULED_PICKUPS";
export const GET_CURRENT_LOCATION = 'GET_CURRENT_LOCATION';
export const UPDATE_CURRENT_PICKUP = "UPDATE_CURRENT_PICKUP";
export const ADD_FROM_LOCATION = "ADD_FROM_LOCATION";
export const ADD_TO_LOCATION = "ADD_TO_LOCATION";
export const ADD_DURATION_TIME = 'ADD_DURATION_TIME';
export const ADD_DISTANCE_AMOUNT = 'ADD_DISTANCE_AMOUNT';
export const SET_USER_DATA = 'SET_USER_DATA';
export const UPDATE_SHIFTS = "UPDATE_SHIFTS";

// ----------------------
// Actions
// ----------------------

export function navigate(page, formNum) {
    return { type: NAVIGATE, page: page, form: formNum };
};

export function toHome() {
    return { type: TO_HOME };
};

export function updateScheduledPickups(scheduledPickups) {
    return { type: UPDATE_SCHEDULED_PICKUPS, scheduledPickups: scheduledPickups };
};

export function updateGeoLocation(position) {
    return { type: GET_CURRENT_LOCATION, payload: position }
};

export function updateCurrentPickup(newPickup) {
    return { type: UPDATE_CURRENT_PICKUP, newPickup: newPickup }
}

export function updateFromLocation(fromLocation) {
    return { type: ADD_FROM_LOCATION, newFromLocation: fromLocation }
}

export function updateToLocation(toLocation) {
    return { type: ADD_TO_LOCATION, newToLocation: toLocation }
}

export function updateRideDuration(time) {
    return { type: ADD_DURATION_TIME, newDuration: time}
}

export function updateRideDistance(distance) {
    return { type: ADD_DISTANCE_AMOUNT, newDistance: distance}
}

export function setUserData(payload) {
    return { type: SET_USER_DATA, payload }
};

export function updateShifts(shifts) {
    return { type: UPDATE_SHIFTS, newShifts: shifts }
}