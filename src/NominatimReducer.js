import { GET_MARKER_POSITION_SUCCESS,
    GET_MARKER_COORDINATES_SUCCESS
} from './NominatimActions';

export default (previousState = {}, { type, payload }) => {
    if (type === GET_MARKER_POSITION_SUCCESS) {
        const { data } = payload;
        const { address } = data;

        const markerAddress = data.display_name;

        const city = address.city ? address.city : address.town;


        return { ...previousState, markerAddress, city };
    }
    if (type === GET_MARKER_COORDINATES_SUCCESS) {
        const { data } = payload;
        let  markerCoordinates = {};

        if (data.length) {
            const { lat, lon } = data[0];

            markerCoordinates =  { lat: +lat, lng: +lon };
        }

        return { ...previousState, markerCoordinates };
    }

    return previousState;
};
