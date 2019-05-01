import { GET_LIST, GET_ONE, CREATE, UPDATE } from 'admin-on-rest';

export const GET_PROVIDERS                =  'GET_PROVIDERS';
export const GET_PROVIDERS_SUCCESS        =  'GET_PROVIDERS_SUCCESS';
export const GET_PROVIDERS_FAILURE        =  'GET_PROVIDERS_FAILURE';


export function prefetchProviders(filter = {}) {
    return ({
        type    : GET_PROVIDERS,
        payload : { isAllList: true, filter: { role: 'PROVIDER', include: 'providers', ...filter } },  // GET clean list without sort/paginations
        meta    : { resource: 'providers', fetch: GET_LIST, cancelPrevious: false }
    });
}

export const GET_PROVIDER                =  'GET_PROVIDER';
export const GET_PROVIDER_SUCCESS        =  'GET_PROVIDER_SUCCESS';
export const GET_PROVIDER_FAILURE        =  'GET_PROVIDER_FAILURE';

export function prefetchProvider(id, filter = {}) {
    return ({
        type    : GET_PROVIDER,
        payload : { filter: { role: 'DRIVER', ...filter }, id  },
        meta    : { resource: 'providers', fetch: GET_ONE, cancelPrevious: false }
    });
}

export const CREATE_PROVIDER_FAILURE = 'CREATE_PROVIDER_FAILURE';
export const CREATE_PROVIDER_SUCCESS = 'CREATE_PROVIDER_SUCCESS';
export const CREATE_PROVIDER         = 'CREATE_PROVIDER';

export function createProvider(data) {
    return ({
        type    : CREATE_PROVIDER,
        payload : {
            data : {
                ...data
            } },
        meta : { resource: 'providers', fetch: CREATE, cancelPrevious: false }
    });
}

export const UPDATE_PROVIDER_FAILURE = 'UPDATE_PROVIDER_FAILURE';
export const UPDATE_PROVIDER_SUCCESS = 'UPDATE_PROVIDER_SUCCESS';
export const UPDATE_PROVIDER         = 'UPDATE_PROVIDER';

export function updateProvider(data, id) {
    return ({
        type    : UPDATE_PROVIDER,
        payload : {
            id,
            data : {
                ...data
            } },
        meta : { resource: 'providers', fetch: UPDATE, cancelPrevious: false }
    });
}

export const CLEAR_PROVIDER = 'CLEAR_PROVIDER';

export function clearStore() {
    return ({
        type   : CLEAR_PROVIDER,
        status : 1
    });
}
