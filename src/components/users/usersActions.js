import { CREATE, GET_LIST, GET_ONE } from 'admin-on-rest';

export const CREATE_RESET_PASSWORD_FAILURE = 'CREATE_RESET_PASSWORD_FAILURE';
export const CREATE_RESET_PASSWORD_SUCCESS = 'CREATE_RESET_PASSWORD_SUCCESS';
export const CREATE_RESET_PASSWORD         = 'CREATE_RESET_PASSWORD';

export function resetPassword(email, password, basePath) {
    return ({
        type    : CREATE_RESET_PASSWORD,
        payload : { email,
            data : {
                email, password
            },
            basePath },
        meta : { resource: 'users/resetPassword', fetch: CREATE, cancelPrevious: false }
    });
}

export const GET_USERS                =  'GET_USERS';
export const GET_USERS_SUCCESS        =  'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE        =  'GET_USERS_FAILURE';


export function prefetchUsers(filter = {}) {
    return ({
        type    : GET_USERS,
        payload : { isAllList: true, filter: { role: 'DRIVER', ...filter } },  // GET clean list without sort/paginations
        meta    : { resource: 'users', fetch: GET_LIST, cancelPrevious: false }
    });
}


export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER         = 'CREATE_USER';

export function createProviderAdmin(id, data) {
    return ({
        type    : CREATE_USER,
        payload : { data : {
            ...data,
            links : {
                provider : { 'type': 'provider', id }
            }
        }
        },
        meta : { resource: 'users', fetch: CREATE, cancelPrevious: false }
    });
}


export const GET_USER                =  'GET_USER';
export const GET_USER_SUCCESS        =  'GET_USER_SUCCESS';
export const GET_USER_FAILURE        =  'GET_USER_FAILURE';


export function prefetchUser(id, filter = {}) {
    return ({
        type    : GET_USER,
        payload : { filter: { role: 'DRIVER', ...filter }, id  },
        meta    : { resource: 'users', fetch: GET_ONE, cancelPrevious: false }
    });
}
