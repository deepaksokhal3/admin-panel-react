import {
    CREATE_COINS_FAILURE,
    CREATE_COINS_SUCCESS
} from './coinActions';


export default (previousState = {}, { type }) => {
    if (type === CREATE_COINS_SUCCESS) {
        return { ...previousState, setCoinStatus: 1 };
    }

    if (type === CREATE_COINS_FAILURE) {
        return { ...previousState, setCoinStatus: 0 };
    }

    return previousState;
};
