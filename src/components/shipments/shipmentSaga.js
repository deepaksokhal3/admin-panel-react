import { showNotification } from 'admin-on-rest';
import { put, takeEvery } from 'redux-saga/effects';
import {
    CREATE_SHIPMENT_FAILURE,
    CREATE_SHIPMENT_SUCCESS
} from './shipmentsAction';

export default function* shipmentSaga() {
    yield [
        takeEvery(CREATE_SHIPMENT_SUCCESS, function* generator() {
            yield put(showNotification('Отгрузка успешно создана'));
        }),
        takeEvery(CREATE_SHIPMENT_FAILURE, function* generator({ error }) {
            yield put(showNotification(error || 'Произошла ошибка', 'warning'));
            console.error(error);
        })
    ];
}
