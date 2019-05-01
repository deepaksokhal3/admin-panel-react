import { CREATE, GET_ONE } from 'admin-on-rest';

export const CREATE_SUBMIT_PASSWORD_FAILURE = 'CREATE_SUBMIT_PASSWORD_FAILURE';
export const CREATE_SUBMIT_PASSWORD_SUCCESS = 'CREATE_SUBMIT_PASSWORD_SUCCESS';
export const CREATE_SUBMIT_PASSWORD         = 'CREATE_SUBMIT_PASSWORD';

export function submitPassword({ confirmPassword, password, id }) {
    return ({
        type    : CREATE_SUBMIT_PASSWORD,
        payload : {
            data : {
                password,
                confirmPassword
            }
        },
        meta : { resource: `actions/${id}`, fetch: CREATE, cancelPrevious: false }
    });
}

export const GET_ACTION_FAILURE = 'GET_ACTION_FAILURE';
export const GET_ACTION_SUCCSESS = 'GET_ACTION_SUCCESS';
export const GET_ACTION = 'GET_ACTION';

export function getAction({ id }) {
    return ({
        type    : GET_ACTION,
        payload : { id },
        meta    : { resource: 'actions', fetch: GET_ONE, cancelPrevious: false }
    });
}


export const CREATE_RESET_ADMIN_PASSWORD_FAILURE = 'CREATE_RESET_ADMIN_PASSWORD_FAILURE';
export const CREATE_RESET_ADMIN_PASSWORD_SUCCESS = 'CREATE_RESET_ADMIN_PASSWORD_SUCCESS';
export const CREATE_RESET_ADMIN_PASSWORD         = 'CREATE_RESET_ADMIN_PASSWORD';

export function resetPassword({ email }) {
    return ({
        type    : CREATE_RESET_ADMIN_PASSWORD,
        payload : {
            data : {
                email
            }
        },
        meta : { resource: 'users/resetPassword', fetch: CREATE, cancelPrevious: false }
    });
}

