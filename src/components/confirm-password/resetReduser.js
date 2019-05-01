import {
    CREATE_SUBMIT_PASSWORD_FAILURE,
    CREATE_SUBMIT_PASSWORD_SUCCESS,
    CREATE_RESET_ADMIN_PASSWORD_FAILURE,
    CREATE_RESET_ADMIN_PASSWORD_SUCCESS,
    GET_ACTION_SUCCSESS,
    GET_ACTION_FAILURE
} from './resetPassActions';

export default (previousState = {}, { type, payload, error }) => {
    if (type === CREATE_SUBMIT_PASSWORD_SUCCESS) {
        return { ...payload, status: 1 };
    }

    if (type === GET_ACTION_SUCCSESS) {
        return { action: payload, status: 1 };
    }

    if (type === GET_ACTION_FAILURE) {
        return { action: error, status: 0 };
    }

    if (type === CREATE_SUBMIT_PASSWORD_FAILURE) {
        return { ...payload, status: 0 };
    }

    if (type === CREATE_RESET_ADMIN_PASSWORD_SUCCESS) {
        return { ...payload, status: 1 };
    }

    if (type === CREATE_RESET_ADMIN_PASSWORD_FAILURE) {
        return { ...payload, status: 0 };
    }

    return previousState;
};
