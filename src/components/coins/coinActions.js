import { UPDATE } from 'admin-on-rest';

export const CREATE_COINS_FAILURE = 'CREATE_COINS_FAILURE';
export const CREATE_COINS_SUCCESS = 'CREATE_COINS_SUCCESS';
export const CREATE_COINS         = 'CREATE_COINS';

export function setCoins({ userId, coins }) {
    const id = localStorage.getItem('providerId');
    const role = localStorage.getItem('role');
    const resource = role === 'ADMIN' ? `providers/${userId}/coins` : `providers/${id}/drivers/${userId}/coins`;

    if (role !== 'ADMIN' && !id) throw new Error('Отсутствует providerId');

    return ({
        type    : CREATE_COINS,
        payload : {
            data : {
                coins
            },
            id : ''
        },
        meta : { resource, fetch: UPDATE, cancelPrevious: false }
    });
}
