import { showNotification } from 'admin-on-rest';
import { push } from 'react-router-redux';
import { put, takeEvery } from 'redux-saga/effects';
import {
    CREATE_SUBMIT_PASSWORD_FAILURE,
    CREATE_SUBMIT_PASSWORD_SUCCESS,
    CREATE_RESET_ADMIN_PASSWORD_SUCCESS,
    CREATE_RESET_ADMIN_PASSWORD_FAILURE
} from './resetPassActions';

export default function* usersSaga() {
    yield [
        takeEvery(CREATE_SUBMIT_PASSWORD_SUCCESS, function* generator() {
            yield put(showNotification('Пароль успешно изменен'));
            yield put(push('/login'));
        }),
        takeEvery(CREATE_SUBMIT_PASSWORD_FAILURE, function* generator({ error }) {
            yield put(showNotification('Произошла ошибка, обратитесь к администратору', 'warning'));
            console.error(error);
        }),
        takeEvery(CREATE_RESET_ADMIN_PASSWORD_SUCCESS, function* generator() {
            yield put(showNotification('Пароль успешно сброшен. Проверьте свою почту'));
        }),
        takeEvery(CREATE_RESET_ADMIN_PASSWORD_FAILURE, function* generator({ error }) {
            yield put(showNotification('Произошла ошибка, обратитесь к администратору', 'warning'));
            console.error(error);
        })
    ];
}
