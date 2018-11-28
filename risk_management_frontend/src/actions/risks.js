import {
    GET_RISK_TYPES_REQUEST,
    GET_RISK_TYPES_REQUEST_SUCCESS,
    GET_RISK_TYPES_REQUEST_FAILURE,
    GET_FIELD_TYPES_REQUEST,
    GET_FIELD_TYPES_REQUEST_SUCCESS,
    GET_FIELD_TYPES_REQUEST_FAILURE,
    ADD_RISK_TYPE_REQUEST,
    ADD_RISK_TYPE_REQUEST_SUCCESS,
    ADD_RISK_TYPE_REQUEST_FAILURE,
    ADD_FIELD_TYPE_REQUEST,
    ADD_FIELD_TYPE_REQUEST_SUCCESS,
    ADD_FIELD_TYPE_REQUEST_FAILURE
} from '../constants';

import { get, post, checkHttpStatus, parseJSON, handleError } from '../utils/fetch';


export function getRiskTypesRequest() {
    return {
        type: GET_RISK_TYPES_REQUEST
    }
}

export function getRiskTypesRequestSuccess(data) {
    return {
        type: GET_RISK_TYPES_REQUEST_SUCCESS,
        payload: data
    }
}


export function getRiskTypesRequestFailure(error) {
    return {
        type: GET_RISK_TYPES_REQUEST_FAILURE,
        error: error
    }
}


export function getRiskTypes() {
    return (dispatch) => {
        dispatch(getRiskTypesRequest())

        return get('risk-types')
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                dispatch(getRiskTypesRequestSuccess(response))
            })
            .catch(error => {
                handleError(error)
                    .then(errorMessage => {
                        dispatch(getRiskTypesRequestFailure(errorMessage))
                    })
            })

    }
}




export function getFieldTypesRequest() {
    return {
        type: GET_FIELD_TYPES_REQUEST
    }
}

export function getFieldTypesRequestSuccess(data) {
    return {
        type: GET_FIELD_TYPES_REQUEST_SUCCESS,
        payload: data
    }
}


export function getFieldTypesRequestFailure(error) {
    return {
        type: GET_FIELD_TYPES_REQUEST_FAILURE,
        error: error
    }
}


export function getFieldTypes() {
    return (dispatch) => {
        dispatch(getFieldTypesRequest())

        return get('field-types')
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                dispatch(getFieldTypesRequestSuccess(response))
            })
            .catch(error => {
                handleError(error)
                    .then(errorMessage => {
                        dispatch(getFieldTypesRequestFailure(errorMessage))
                    })
            })
    }
}




export function addFieldTypesRequest() {
    return {
        type: ADD_FIELD_TYPE_REQUEST
    }
}

export function addFieldTypesRequestSuccess(data) {
    return {
        type: ADD_FIELD_TYPE_REQUEST_SUCCESS,
        payload: data
    }
}


export function addFieldTypesRequestFailure(error) {
    return {
        type: ADD_FIELD_TYPE_REQUEST_FAILURE,
        error: error
    }
}



export function addFieldTypes(data) {
    return (dispatch) => {
        dispatch(addFieldTypesRequest())

        return post('field-types', data)
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                dispatch(addFieldTypesRequestSuccess(response))
                return true
            })
            .catch(error => {
                handleError(error)
                    .then(errorMessage => {
                        dispatch(addFieldTypesRequestFailure(errorMessage))
                        return false
                    })
            })
    }
}







export function addRiskTypesRequest() {
    return {
        type: ADD_RISK_TYPE_REQUEST
    }
}

export function addRiskTypesRequestSuccess(data) {
    return {
        type: ADD_RISK_TYPE_REQUEST_SUCCESS,
        payload: data
    }
}


export function addRiskTypesRequestFailure(error) {
    return {
        type: ADD_RISK_TYPE_REQUEST_FAILURE,
        error: error
    }
}



export function addRiskTypes(data) {
    return (dispatch) => {
        dispatch(addRiskTypesRequest())

        return post('risk-types', data)
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                dispatch(addRiskTypesRequestSuccess(response))
                return true
            })
            .catch(error => {
                handleError(error)
                    .then(errorMessage => {
                        dispatch(addRiskTypesRequestFailure(errorMessage))
                        return false
                    })
            })
    }
}




























