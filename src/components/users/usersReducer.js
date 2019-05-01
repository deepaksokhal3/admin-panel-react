import { GET_USERS_SUCCESS, CREATE_USER_SUCCESS, CREATE_USER_FAILURE } from './usersActions';

export default (previousState = {}, { type, payload }) => {
    if (type === GET_USERS_SUCCESS) {
        const { data } = payload;
        const newData = data.map(userItem => {
            if (userItem.coordinates) {
                return {
                    id          : userItem.id,
                    driverName  : `${userItem.firstName} ${userItem.secondName}`,
                    coordinates : { lat: userItem.coordinates[0], lng: userItem.coordinates[1] },
                    imageUrl    : userItem.imageUrl
                };
            }
        }).filter(item => !!item);

        return { ...previousState, users: newData };
    }

    if (type === CREATE_USER_SUCCESS) {
        return { ...payload, status: 1 };
    }

    if (type === CREATE_USER_FAILURE) {
        return { ...payload, status: 0 };
    }

    return previousState;
};
