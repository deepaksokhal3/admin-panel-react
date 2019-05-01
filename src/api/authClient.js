import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_GET_PERMISSIONS } from 'admin-on-rest';
import jwtDecode          from 'jwt-decode';
import uuid               from 'uuid';
import { apiUrl, retryLimit, retryInterval } from '../etc/config.json';

function sleep(t) {
    return new Promise(res => setTimeout(res, t));
}

async function tryFetch(_id, init,  attempts = 0) {
    let result;

    try {
        result = await fetch(`${apiUrl}/sessions?_id=${_id}`, init);

        return result;
    } catch (error) {
        if (attempts < retryLimit) {
            await sleep(retryInterval);

            return result = await tryFetch(_id, init, attempts + 1);
        }

        return Promise.reject(error);
    }
}

export default async (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        let errorMsg = 'Пожалуйста, обратитесь к вашему системному администратору';

        const init = {
            method  : 'POST',
            body    : JSON.stringify({ data: { email: username, password, fromSite: true } }),
            headers : new Headers({ 'Content-Type': 'application/json' })
        };
        const _id = uuid.v4();

        try {
            const response =  await tryFetch(_id, init);

            if (response && response.status === 404) {
                return Promise.reject(response.statusText);
            }
            const data = await response.json();

            if (data && data.status === 1) {
                const token = data.data.jwt;
                const decoded = await jwtDecode(token);

                localStorage.setItem('token', token);
                localStorage.setItem('providerId', decoded.links.provider.id);
                localStorage.setItem('role', decoded.role);

                if (decoded.links.provider.coordinates) {
                    localStorage.setItem('providerLat', decoded.links.provider.coordinates.lat);
                    localStorage.setItem('providerLon', decoded.links.provider.coordinates.lon);
                    localStorage.setItem('providerCurrency', decoded.links.provider.currency);
                }

                return data;
            }

            if (data && data.status === 0) {
                const errorCode = data.error.code;

                if (errorCode === 'NOT_ACTIVE_USER') errorMsg = 'Такого пользователя не существует';
                if (errorCode === 'AUTHENTICATION_FAILED') errorMsg = 'Неверный логин или пароль';
                console.warn(_id);

                throw new Error(errorMsg);

                // return Promise.reject(data.error);
            }
        } catch (err) {
            console.warn(err, _id);
            const newError = new Error(errorMsg);

            return Promise.reject(newError);
        }
    }


    if (type === AUTH_CHECK) {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const providerId = localStorage.getItem('providerId');

        if ((role === 'ADMIN' && token) || (role === 'PROVIDER_ADMIN' && providerId && token)) return Promise.resolve();

        return Promise.reject();
    }

    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        localStorage.removeItem('providerId');
        localStorage.removeItem('role');

        return Promise.resolve();
    }

    if (type === AUTH_GET_PERMISSIONS) {
        const role = localStorage.getItem('role');

        return Promise.resolve(role);
    }

    return Promise.resolve();
};
