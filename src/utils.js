import { fields, errors } from './etc/dictionary.json';

export function prepareError(field, error) {
    if (!(field && error)) return 'Unhandled Error';

    return `${fields[field] ? fields[field] : field} ${errors[error] ? errors[error] : error}`;
}

export function chooseType(type) {
    let text;

    switch (type) {
        case 'BOTTLE':
            text = 'Тара';
            break;
        case 'BOTTLED_WATER':
            text = 'Вода с тарой';
            break;
        case 'WATER':
            text = 'Вода';
            break;
        case 'OTHER_PRODUCT':
            text = 'Товар';
            break;
        default:
            text = 'None';
    }

    return text;
}

function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km

    return d;
}


function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

export function checkDistance(pointToCheck, points) {
    if (points.length < 2) return true;
    const pointsDictance = [];

    points.forEach((point) => {
        if (pointToCheck.position !== point.position) {
            pointsDictance.push(getDistance(point.lat, point.lon, pointToCheck.lat, pointToCheck.lon));
        }
    });
    const furthest = Math.max.apply(null, pointsDictance);


    return furthest;
}
