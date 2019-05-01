import { showNotification } from 'admin-on-rest';
import { put, takeEvery } from 'redux-saga/effects';
import {
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_SUCCESS,
    CANCEL_ORDER_FAILURE,
    CANCEL_ORDER_SUCCESS,
    GET_PRODUCTS_FOR_ORDER_FAILURE
} from './ordersAction';

export default function* shipmentSaga() {
    yield [
        takeEvery(CREATE_ORDER_SUCCESS, function* generator() {
            yield put(showNotification('Заказ успешно оформлен'));
        }),
        takeEvery(CREATE_ORDER_FAILURE, function* generator({ error }) {
            let errMsg = 'Произошла ошибка';

            if (error === 'TOO_MUCH_EMPTY_BOTTLES') errMsg = 'Добавлено слишком много пустой тары';

            yield put(showNotification(errMsg, 'warning'));
            console.error(error);
        }),
        takeEvery(CANCEL_ORDER_SUCCESS, function* generator() {
            yield put(showNotification('Заказ успешно отменен'));
        }),
        takeEvery(GET_PRODUCTS_FOR_ORDER_FAILURE, function* generator() {
            yield put(showNotification('Произошла ошибка при загрузке списка товаров', 'warning'));
        }),
        takeEvery(CANCEL_ORDER_FAILURE, function* generator({ error }) {
            yield put(showNotification('Произошла ошибка', 'warning'));
            console.error(error);
        })
    ];
}
