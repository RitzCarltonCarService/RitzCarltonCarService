export const NAVIGATE = "NAVIGATE";
export function navigate(page, formNum) {
    return { type: NAVIGATE, page: page, form: formNum };
};

export const TO_HOME = "TO_HOME";
export function toHome() {
    return { type: TO_HOME };
};

export const UPDATE_SCHEDULED_PICKUPS = "UPDATE_SCHEDULED_PICKUPS";
export function updateScheduledPickups(scheduledPickups) {
    return { type: UPDATE_SCHEDULED_PICKUPS, scheduledPickups: scheduledPickups };
}

export const UPDATE_CURRENT_PICKUP = "UPDATE_CURRENT_PICKUP";
export function updateCurrentPickup(newPickup) {
    console.log("action dispatched")
    return { type: UPDATE_CURRENT_PICKUP, newPickup: newPickup}
}