import { CREATE, GET_LIST } from 'admin-on-rest';

export const CREATE_SHIPMENT_FAILURE = 'CREATE_SHIPMENT_FAILURE';
export const CREATE_SHIPMENT_SUCCESS = 'CREATE_SHIPMENT_SUCCESS';

export function createShipment(id, products, type, basePath) {
    return ({
        type    : CREATE_SHIPMENT,
        payload : { id,
            data : {
                links : { driver: { type: 'users', id }, products },
                type
            },
            basePath,
            includes : 'driver,products' },
        meta : { resource: 'shipments', fetch: CREATE, cancelPrevious: false }
    });
}


export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';

export function prefetchProducts() {
    return {
        type    : GET_PRODUCTS,
        payload : { isAllList: true, filter: {} }, // GET clean list without sort/paginations
        meta    : { resource: 'products', fetch: GET_LIST, cancelPrevious: false }
    };
}

export const GET_SHIPMENTS_SUCCESS = 'GET_SHIPMENTS_SUCCESS';
export const GET_SHIPMENTS = 'GET_SHIPMENTS';
export const CREATE_SHIPMENT = 'CREATE_SHIPMENT';
export const SHIPMENT_LOADING = 'SHIPMENT_LOADING';

export function prefetchShipments({ page, perPage }, filter = {}) {
    return {
        type    : GET_SHIPMENTS,
        payload : { isAllList: false, pagination: { page, perPage }, filter },
        meta    : { resource: 'shipments', fetch: GET_LIST, cancelPrevious: false }
    };
}
