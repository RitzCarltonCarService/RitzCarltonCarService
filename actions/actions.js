export const NAVIGATE = "NAVIGATE";

export function navigate(page, formNum) {
    return { type: NAVIGATE, page: page, form: formNum};
}

export const TO_HOME = "TO_HOME";

export function toHome() {
    return {type: TO_HOME};
}