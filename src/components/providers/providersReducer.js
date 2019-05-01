import { CREATE_COINS_SUCCESS } from '../coins/coinActions';
import { GET_PROVIDERS_SUCCESS, GET_PROVIDERS_FAILURE,
    CREATE_PROVIDER_SUCCESS, CREATE_PROVIDER_FAILURE,
    GET_PROVIDER_SUCCESS, CLEAR_PROVIDER
} from './providersActions';

export default (previousState = {}, { type, requestPayload, payload }) => {
    if (type === GET_PROVIDER_SUCCESS) {
        const { data } = payload;

        return { ...previousState, data, status: 1 };
    }
    if (type === GET_PROVIDERS_SUCCESS) {
        const { data } = payload;
        const currentProviderId = localStorage.getItem('providerId');
        let coins = 0;

        if (Array.isArray(data)) {
            const currentProvider = data.find(item => item.id === currentProviderId);

            coins = currentProvider.coins;
        }

        return { ...previousState, coins, status: 1 };
    }

    if (type === GET_PROVIDERS_FAILURE) {
        return { ...previousState, status: 0 };
    }

    if (type === CREATE_COINS_SUCCESS) {
        const { data } = payload;
        let coins = 0;

        if (typeof (data) === 'object') {
            coins =  data.coins;
        } else {
            coins = data.coins;
        }

        return { ...previousState, coins };
    }
    if (type === CREATE_PROVIDER_SUCCESS) {
        const id = payload.data.id;

        return { ...previousState, status: { id, isCreated: true } };
    }
    if (type === CREATE_PROVIDER_FAILURE) {
        const id = requestPayload.id;

        return { ...previousState, status: { id, isCreated: false } };
    }
    if (type === CLEAR_PROVIDER) {
        return { ...previousState, data: {} };
    }

    return previousState;
};
