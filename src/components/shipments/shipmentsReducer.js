import { GET_PRODUCTS_SUCCESS, CREATE_SHIPMENT_SUCCESS, GET_SHIPMENTS_SUCCESS, CREATE_SHIPMENT_FAILURE } from './shipmentsAction.js';

export default (previousState = {}, { type, payload }) => {
    if (type === GET_PRODUCTS_SUCCESS) {
        const { data } = payload;

        return { ...previousState, products: data };
    }

    if (type === GET_SHIPMENTS_SUCCESS) {
        let newShipmentState = {};

        if (previousState.data && previousState.data.length) {
            const newData =  payload.data;

            // newData.push(previousState.data[0]);
            newShipmentState = { ...payload, data: newData };
        } else {
            newShipmentState = payload;
        }

        return { ...previousState, ...newShipmentState };
    }

    if (type === CREATE_SHIPMENT_SUCCESS) {
        return  { ...previousState, createShipmentStatus: 1 };
    }

    if (type === CREATE_SHIPMENT_FAILURE) {
        return  { ...previousState, createShipmentStatus: 0 };
    }

    // if (type === CRUD_GET_LIST_SUCCESS) {
    //     return payload.data;
    // }

    return previousState;
};
