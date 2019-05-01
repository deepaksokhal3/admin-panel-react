
export const GET_NOMINATIM = 'GET_NOMINATIM';

export const GET_MARKER_COORDINATES = 'GET_MARKER_COORDINATES';
export const GET_MARKER_COORDINATES_SUCCESS = 'GET_MARKER_COORDINATES_SUCCESS';
export const GET_MARKER_COORDINATES_FAILURE = 'GET_MARKER_COORDINATES_FAILURE';

export function searchNominatimCoordinates(params) {
    const { queryString, language = 'ru', limit = 1 } = params;

    return ({
        type    : GET_MARKER_COORDINATES,
        payload : { isAllList: true, sort: { q: queryString, format: 'json', addressdetails: 2 }, language, limit },
        meta    : { resource: 'search', fetch: GET_NOMINATIM, cancelPrevious: false }
    });
}


export const GET_MARKER_POSITION = 'GET_MARKER_POSITION';
export const GET_MARKER_POSITION_SUCCESS = 'GET_MARKER_POSITION_SUCCESS';
export const GET_MARKER_POSITION_FAILURE = 'GET_MARKER_POSITION_FAILURE';

export function searchNominatimPlace(params) {
    const { longitude, latitude  } = params;

    return ({
        type    : GET_MARKER_POSITION,
        payload : {
            isAllList : true,
            sort      : { lat: latitude, lon: longitude, format: 'json', addressdetails: 1, zoom: 18 },
            language  : 'ru'
        },
        meta : { resource: 'reverse', fetch: GET_NOMINATIM, cancelPrevious: false }
    });
}
