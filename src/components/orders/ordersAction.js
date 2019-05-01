import { CREATE, GET_LIST, UPDATE } from 'admin-on-rest';

export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER         = 'CREATE_ORDER';

export function createOrder({ products, basePath, coordinates, info, address }) {
    const id = localStorage.getItem('providerId');

    if (!id) throw new Error('Отсутствует providerId');

    return ({
        type    : CREATE_ORDER,
        payload : { id,
            data : {
                info,
                coordinates,
                address,
                links : { provider: { type: 'provider', id }, products }
            },
            basePath },
        meta : { resource: 'orders', fetch: CREATE, cancelPrevious: false }
    });
}

export const CLEAR_ORDER_STORE = 'CLEAR_ORDER_STORE';

export function clearStore() {
    return ({
        type   : CLEAR_ORDER_STORE,
        status : { id: '', isCreated: false }
    });
}


export const GET_PRODUCTS_FOR_ORDER = 'GET_PRODUCTS_FOR_ORDER';
export const GET_PRODUCTS_FOR_ORDER_SUCCESS = 'GET_PRODUCTS_FOR_ORDER_SUCCESS';
export const GET_PRODUCTS_FOR_ORDER_FAILURE = 'GET_PRODUCTS_FOR_ORDER_FAILURE';

export function prefetchProducts() {
    return {
        type    : GET_PRODUCTS_FOR_ORDER,
        payload : { isAllList: true, filter: {} }, // GET clean list without sort/paginations
        meta    : { resource: 'products', fetch: GET_LIST, cancelPrevious: false }
    };
}


export const CANCEL_ORDER_FAILURE = 'CANCEL_ORDER_FAILURE';
export const CANCEL_ORDER_SUCCESS = 'CANCEL_ORDER_SUCCESS';
export const CANCEL_ORDER         = 'CANCEL_ORDER';

export function cancelOrder({ id }) {
    if (!id) throw new Error('Отсутствует ID');

    return ({
        type    : CANCEL_ORDER,
        payload : { id, data: {}, isCancel: true },
        meta    : { resource: 'orders', fetch: UPDATE, cancelPrevious: false }
    });
}


export const GET_ORDER_FAILURE = 'GET_ORDER_FAILURE';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER         = 'GET_ORDER';

export function prefetchOneOrder(params,
    filter = { include: 'drivers,clients,products,providers' }
) {
    const { page, perPage = 10, sort, order } = params;

    return ({
        type    : GET_ORDER,
        payload : { isAllList: false, pagination: { page, perPage: perPage  || 10 }, sort: { field: sort || 'createdAt', order: order || 'DESC' }, filter },
        meta    : { resource: 'orders', fetch: GET_LIST, cancelPrevious: false }
    });
}


export const GET_ORDERS_REPORT_FAILURE = 'GET_ORDERS_REPORT_FAILURE';
export const GET_ORDERS_REPORT_SUCCESS = 'GET_ORDERS_REPORT_SUCCESS';
export const GET_ORDERS_REPORT         = 'GET_ORDERS_REPORT';

export function prefetchOrdersReportList(params) {
    const { createdAt } = params;

    return ({
        type    : GET_ORDERS_REPORT,
        payload : { isAllList: true, filter: { createdAt, include: 'drivers,clients,products,providers' } },
        meta    : { resource: 'orders', fetch: GET_LIST, cancelPrevious: false }
    });
}

