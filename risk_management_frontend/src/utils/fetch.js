import { API_URL } from '../constants';

export const paths = {
    "risk-types": "risks/risk-types/",
    "field-types": "risks/field-types/"
}

function fetchBackend(endpoint, method, auth, body, params) {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    const fetchObject = { method, headers };
    const path = paths[endpoint] || endpoint;
    let url = `${API_URL}${path}`;

    if (body) {
        fetchObject.body = JSON.stringify(body);
    }

    if (params) {
        const paramsArray = Object.keys(params).map((key) => {
            return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
        });

        url += `?${paramsArray.join('&')}`;
    }

    if (auth) {
        const token = sessionStorage.getItem('token');
        if (token) {
            headers.Authorization = `JWT ${token}`;
        }
    }

    return fetch(url, fetchObject);

}

export function get(endpoint, params, auth = true) {
    return fetchBackend(endpoint, 'GET', auth, null, params);
}

export function post(endpoint, body, auth = true) {
    return fetchBackend(endpoint, 'POST', auth, body);
}

export function put(endpoint, body, auth = true) {
    return fetchBackend(endpoint, 'POST', auth, body);
}

export function del(endpoint, auth = true) {
    return fetchBackend(endpoint, 'DELETE', auth);
}

export function checkHttpStatus(response) {
    if (response && response.ok) {
        return response;
    }

    const errorText = response && response.statusText ? response.statusText : 'Unknown Error';
    const error = new Error(errorText);
    error.response = response;
    throw error;
}

export function parseJSON(response) {
    return response.json();
}


export function handleError(error) {
    return error.response.json()
        .then(err => {
            return Object.values(err).join('.\n')
        })
}


