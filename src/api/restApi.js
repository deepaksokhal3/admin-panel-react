/*eslint-disable */
import { stringify } from 'query-string';
import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
    fetchUtils
} from 'admin-on-rest';
import { nominatimApiPrefix } from '../etc/config.json';
import { GET_NOMINATIM } from '../NominatimActions';
import uuid from 'uuid';
import { prepareError }   from '../utils';
import { retryLimit, retryInterval } from '../etc/config.json';

const { fetchJson } = fetchUtils;

const checkServerErrors = (json, _id) => {
    if (!json.status) {
        let errorMsg = 'Что-то пошло не так. Повторите попытку';
        const { fields, code } = json.error;
        if (json.error.code === 'PERMISSION_DENIED'){
            localStorage.setItem('token', '');
            console.warn(json.error, _id);
            errorMsg = 'Не валидный токен'
        } else if (json.error.code === 'SERVER_ERROR'){
            errorMsg = 'Пожалуйста, обратитесь к вашему системному администратору'
        } else if (json.error.code === 'FAILED_TO_CREATE' && fields && fields.products === 'TOO_MUCH_EMPTY_BOTTLES' ){
            errorMsg = 'TOO_MUCH_EMPTY_BOTTLES'
        } else if(json.error.code === 'BOTTLE_ALREADY_EXIST') {
            errorMsg = 'Бутыль уже существует'
        } else if(json.error.code === 'NOT_CREATED') {
            errorMsg = json.error.fields.product === 'NOT_ENOUGH_ITEMS' ? 'Количество товаров превышает допустимое' : 'Не создан'
        } else if(json.error.code === 'PRODUCT_IN_USE') {
            errorMsg = 'Невозможно удалить товар, пока он есть в наличии у менеджера'
        } else if(json.error.fields["data/coordinates"] === 'REQUIRED') {
            errorMsg = 'Невозможно создать поставщика без города'
        } else if(json.error.fields["data/coordinates"] === 'CANNOT_BE_EMPTY') {
            errorMsg = 'Невозможно обновить поставщика без города'
        } else if(json.error.code === 'CANNOT_SEARCH_PLUS') {
            errorMsg = 'Невозможно выполнить поиск по "+"'
        } 
        else {
            console.warn(json.error, _id);
            errorMsg = fields ?  prepareError(Object.keys(fields)[0] , json.error.code) : prepareError(' ', json.error.message)
        } 
        console.warn(_id);
        throw new Error(errorMsg);
    }
}

function dump(client){
    if(!client) return client;
    
    return {
        ...client,
        secondName : client.firstName + ' ' + client.secondName 
    }
}

const prepareDataWithLinks = (response) => {
    const { data, linked } = response;
    const resultArr = [];
    let driver = {};
    let client = {};
    let provider = {};
    let productsLinks = [];
    let productsItems = [];

    for (const item in data) {
        driver = {};
        client = {};
        provider = {};

        if (item) {
            const { id, links, createdAt, deadLine } = data[item];

            if (links && links.driver) {
                const driverId = links.driver.id;
                driver = dump(linked.drivers.find(d => d.id === driverId));
            }

            if (links && links.client) {
                const clientId = links.client.id;
                client = dump(linked.clients.find(d => d.id === clientId));
            }

            if (links && links.provider) {
                const providerId = links.provider.id;
                provider = linked.providers.find(d => d.id === providerId);
            }

            if(links && links.products) {
                productsLinks    = links.products;
                const productsIds = productsLinks.map(product => product.id);
                productsItems = linked.products.filter(product => productsIds.includes(product.id));
            }

            resultArr.push({ id, createdAt, driver, provider, client, productsLinks, productsItems, ...data[item] });
        }
    }

    return { data: resultArr }
}

export default (apiUrl, httpClient = fetchJson) => {
    const convertRESTRequestToHTTP = (type, resource, params) => {
        const Authorization = localStorage.getItem('token') ? localStorage.getItem('token') : null;
        const providerIdIsRequired = resource === 'products' || resource === 'shipments' ||  resource === 'orders' || resource === 'geosettings';
        const providerId = localStorage.getItem('providerId') && providerIdIsRequired ? `providers/${localStorage.getItem('providerId')}/` : '';
        let url = '';
        let query = {};
        const options = {};

        options.headers = new Headers({ Accept: 'application/json' });
        options.headers.set('Authorization', Authorization);

        const checkFormData = (params) => {
            const dataObj = params.data;
            const isImage = dataObj.image && typeof dataObj.image !== 'string';
            const isDocs = dataObj.document && typeof dataObj.document !== 'string';

            if (isImage || isDocs) {
                const formData = new FormData();

                for (const key in dataObj) {
                    formData.append(key, dataObj[key]);
                }

                return formData;
            }

            if(dataObj.carNumber || dataObj.carModel || dataObj.carOwner) {
                let car = {};
                car.number = dataObj.carNumber;
                car.model = dataObj.carModel;
                if (dataObj.carOwner) {
                    car.owner =  dataObj.carOwner;
                    // delete dataObj.carOwner;
                }
                // delete dataObj.carModel;
                // delete dataObj.carNumber;
                
                dataObj.car = car;
            }

            if(dataObj.type === 'OTHER_PRODUCT' && (dataObj.capacity === 0 || dataObj.capacity)) delete dataObj.capacity;

            return JSON.stringify({ data: dataObj });
        };
    
        switch (type) {
            case GET_LIST: {
                if (!params.isAllList) {
                    const { page, perPage } = params.pagination;
                    const filters =  params.filter;
                    const sort =  params.sort;
                    if(filters.search){
                        filters.search = filters.search.replace(/,/g, '');
                    }
                    if(filters.clientSearch){
                        filters.clientSearch = filters.clientSearch.replace(/,/g, '');
                    }
                    if(filters.driverSearch){
                        filters.driverSearch = filters.driverSearch.replace(/,/g, '');
                    }
                    query = {
                        limit  : (10),
                        offset : (page - 1) * perPage,
                        ...filters,
                        ...sort
                    };
                } else {                  
                    query = {limit: 1000, offset: 0, ...params.filter};
                }

                url = `${apiUrl}/${providerId}${resource}`;
                break;
            }

            case GET_ONE:
                url = `${apiUrl}/${providerId}${resource}/${params.id}`;
                if(resource === 'geosettings') url =`${apiUrl}/${providerId}`
                break;
            case GET_NOMINATIM:{
                const { sort,  limit, language }  =  params;

                query = {...sort}
                if (limit)    query.limit =limit;
                if (language) query['accept-language'] = language;
        
                url = `${nominatimApiPrefix}/${resource}`;
                break;
            }
            case GET_MANY: {
                const query = {
                    filter : JSON.stringify({ id: params.ids })
                };

                url = `${apiUrl}/${providerId}${resource}`;
                break;
            }
            case UPDATE: {
                url = `${apiUrl}/${providerId}${resource}/${params.id}${params.isCancel ? '/cancel' : ''}`;
                
                options.method = 'PATCH';
                options.body = checkFormData(params);
                break;
            }
            case CREATE: {
                params.includes ? query.include = params.includes : ''

                url = `${apiUrl}/${providerId}${resource}`;
                options.method = 'POST';

                options.body = checkFormData(params);
                break;
            }
            case DELETE:
                url = `${apiUrl}/${providerId}${resource}/${params.id}`;
                options.method = 'DELETE';
                break;
            default:
                throw new Error(`Unsupported fetch action type ${type}`);
        }

        return { url, options, query };
    };

    const convertHTTPResponseToREST = (response, type, resource, params, _id) => {
        const { /* headers*/ json } = response;

        switch (type) {
            case GET_LIST:
            case GET_MANY_REFERENCE: {
                checkServerErrors(json, _id);

                const prepareData = json.linked && Object.keys(json.linked).length ? prepareDataWithLinks(json)  : { data: json.data };

                return {
                    data      : prepareData.data,
                    total     : json.meta && json.meta.filteredCount || 0
                };
            }
            case UPDATE: {
                checkServerErrors(json, _id);

                return   json.data ?  { data: { ...json.data, id: json.data.id } } :   { data: json };
            }
            case CREATE: {
                checkServerErrors(json, _id);;
                const { data } = json;

                return   json.data ?  { data: { ...json.data, id: json.data.id } } :   { data: json };
            }
            case GET_NOMINATIM: {
                return { data: json };
            }

            case GET_ONE: {
                checkServerErrors(json, _id);

                const currentResponce = json.data;

                if ( currentResponce.car) {
                        currentResponce.carNumber = currentResponce.car.number;
                        currentResponce.carModel =  currentResponce.car.model;
                        currentResponce.carOwner = currentResponce.car.owner ?  currentResponce.car.owner : ''
                }
                return { data: currentResponce };
            }
            default:{
                checkServerErrors(json, _id);;
                return { data: json };
            }
                
        }
    };

    return async (type, resource, params) => {
        const { url, options, query } = convertRESTRequestToHTTP(
            type,
            resource,
            params
        );

        const _id = uuid.v4();
        query._id = _id;
        const response = await tryFetch({httpClient, url, query, options, _id});
        return convertHTTPResponseToREST(response, type, resource, params, _id );
    };
};

function sleep(t) {
    return new Promise(res => setTimeout(res, t));
}

async function tryFetch({options, httpClient, url, query, _id, attempts = 0 }) {
    const errorMsg = 'Пожалуйста, обратитесь к вашему системному администратору';
    let response;
    
    try {
        return response = await httpClient(`${url}?${stringify(query)}`, options);
    } catch (error) {
        if (attempts < retryLimit) {
            await sleep(retryInterval);

            return response = await tryFetch({ options, httpClient, url, query, _id, attempts: attempts + 1 });
        }

        console.warn(error, _id);
        const newError = new Error(errorMsg);

        return Promise.reject(newError);
    }
}
