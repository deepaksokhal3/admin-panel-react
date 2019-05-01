import { showNotification } from 'admin-on-rest';
import { put, takeEvery } from 'redux-saga/effects';
import {
    CREATE_COINS_FAILURE,
    CREATE_COINS_SUCCESS
} from './coinActions';

export default function* shipmentSaga() {
    yield [
        takeEvery(CREATE_COINS_SUCCESS, function* generator() {
            yield put(showNotification('Даные обновлены'));
        }),
        takeEvery(CREATE_COINS_FAILURE, function* generator({ error }) {
            yield put(showNotification('Произошла ошибка', 'warning'));
            console.error(error);
        })
    ];
}
