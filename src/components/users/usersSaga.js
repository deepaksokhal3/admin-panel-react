import { showNotification } from 'admin-on-rest';
import { put, takeEvery } from 'redux-saga/effects';
import {
    CREATE_RESET_PASSWORD_FAILURE,
    CREATE_RESET_PASSWORD_SUCCESS,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE
} from './usersActions';

export default function* usersSaga() {
    yield [
        takeEvery(CREATE_RESET_PASSWORD_SUCCESS, function* generator() {
            yield put(showNotification('Пароль успешно сохранен'));
        }),
        takeEvery(CREATE_RESET_PASSWORD_FAILURE, function* generator({ error }) {
            yield put(showNotification('Произошла ошибка, обратитесь к администратору', 'warning'));
            console.error(error);
        }),
        takeEvery(CREATE_USER_SUCCESS, function* generator() {
            yield put(showNotification('Пользователь создан'));
        }),
        takeEvery(CREATE_USER_FAILURE, function* generator({ error }) {
            let errorMsg = 'Произошла ошибка, обратитесь к администратору';

            if (error === 'Email: не уникальное поле' || error === 'Телефон: не уникальное поле') errorMsg = error;

            yield put(showNotification(errorMsg, 'warning'));
            console.error(error);
        })
    ];
}
