export const NAVIGATE = "NAVIGATE";
export function navigate(page, formNum) {
    return { type: NAVIGATE, page: page, form: formNum };
};

export const TO_HOME = "TO_HOME";
export function toHome() {
    return { type: TO_HOME };
};

export const LOG_IN = 'LOG_IN';
export function logIn() {
    return { type: LOG_IN }
};

export const LOG_OUT = 'LOG_OUT';
export function logOut() {
    return { type: LOG_OUT }
}

export const UPDATE_SCHEDULED_PICKUPS = "UPDATE_SCHEDULED_PICKUPS";
export function updateScheduledPickups(scheduledPickups) {
    return { type: UPDATE_SCHEDULED_PICKUPS, scheduledPickups: scheduledPickups };
}