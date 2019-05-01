import { CANCEL_ORDER_FAILURE,
    CANCEL_ORDER_SUCCESS,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    CLEAR_ORDER_STORE,
    GET_PRODUCTS_FOR_ORDER_SUCCESS,
    GET_PRODUCTS_FOR_ORDER_FAILURE,
    GET_ORDERS_REPORT_FAILURE,
    GET_ORDERS_REPORT_SUCCESS
} from './ordersAction';


export default (previousState = {}, { type, requestPayload, payload }) => {
    if (type === GET_ORDERS_REPORT_SUCCESS) {
        const { data } = payload;

        return { ...previousState, ordersReportData: data };
    }

    if (type === GET_ORDERS_REPORT_FAILURE) {
        return { ...previousState, ordersReportData: {} };
    }

    if (type === CANCEL_ORDER_SUCCESS) {
        const id = requestPayload.id;

        return { ...previousState, status: { id, isClosed: true } };
    }

    if (type === CANCEL_ORDER_FAILURE) {
        const id = requestPayload.id;

        return { ...previousState, status: { id, isClosed: false  } };
    }

    if (type === CREATE_ORDER_SUCCESS) {
        const id = payload.data.id;

        return { ...previousState, status: { id, isCreated: true } };
    }

    if (type === CLEAR_ORDER_STORE) {
        return { ...previousState, status: { id: '', isCreated: false } };
    }

    if (type === CREATE_ORDER_FAILURE) {
        const id = requestPayload.id;

        return { ...previousState, status: { id, isCreated: false } };
    }

    if (type === GET_PRODUCTS_FOR_ORDER_SUCCESS) {
        const { data } = payload;

        return { ...previousState, productsForOrder: data };
    }

    if (type === GET_PRODUCTS_FOR_ORDER_FAILURE) {
        return { ...previousState, productsForOrder: {} };
    }


    return previousState;
};
