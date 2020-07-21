import {
    ACTIVATE_PASSWORD,
    DEACTIVATE_PASSWORD,
    SET_PASSWORD_TYPE,
    RESET_PASSWORD_TYPE,
    UPDATE_TIMELOCK,
    REMOVE_TIMELOCK,
    INCREASE_ATTEMPT_NUMBER,
    RESET_ATTEMPT_NUMBER,
    ACTIVATE_BIOMETRIC,
    DEACTIVATE_BIOMETRIC,
} from "../actions";

const lockState = {
    isPasswordSet: false,
    passwordType: "none",
    isBiometricSet: false,
    timeLock: "",
    passwordAttempt: 0
}

export default function lockReducer (state = lockState, action){
    switch(action.type){
        case ACTIVATE_PASSWORD:
            state.isPasswordSet = true;
            return {...state};
        case DEACTIVATE_PASSWORD:
            state.isPasswordSet = false;
            return {...state};
        case SET_PASSWORD_TYPE:
            state.passwordType= action.passwordType;
            return {...state};
        case RESET_PASSWORD_TYPE:
            state.passwordType= "none";
            return {...state};
        case UPDATE_TIMELOCK:
            state.timeLock = new Date().toISOString();
            return {...state};
        case REMOVE_TIMELOCK:
            state.timeLock = ""
            return {...state};
        case INCREASE_ATTEMPT_NUMBER:
            state.passwordAttempt += 1
            return {...state};
        case RESET_ATTEMPT_NUMBER:
            state.passwordAttempt = 0
            return {...state};
        case ACTIVATE_BIOMETRIC:
            state.isBiometricSet = true
            return {...state};
        case DEACTIVATE_BIOMETRIC:
            state.isBiometricSet = false
            return {...state};
        default: 
            return state
    }
}