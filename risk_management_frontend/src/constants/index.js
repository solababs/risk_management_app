export const DEV_MODE = window.location.hostname === 'localhost' ? true : false;
export const API_URL = DEV_MODE ? 'http://localhost:8000/' : 'https://risk-management-api.herokuapp.com/';

export const GET_RISK_TYPES_REQUEST = "GET_RISK_TYPES_REQUEST"
export const GET_RISK_TYPES_REQUEST_SUCCESS = "GET_RISK_TYPES_REQUEST_SUCCESS"
export const GET_RISK_TYPES_REQUEST_FAILURE = "GET_RISK_TYPES_REQUEST_FAILURE"

export const GET_FIELD_TYPES_REQUEST = "GET_FIELD_TYPES_REQUEST"
export const GET_FIELD_TYPES_REQUEST_SUCCESS = "GET_FIELD_TYPES_REQUEST_SUCCESS"
export const GET_FIELD_TYPES_REQUEST_FAILURE = "GET_FIELD_TYPES_REQUEST_FAILURE"

export const ADD_RISK_TYPE_REQUEST = "ADD_RISK_TYPE_REQUEST"
export const ADD_RISK_TYPE_REQUEST_SUCCESS = "ADD_RISK_TYPE_REQUEST_SUCCESS"
export const ADD_RISK_TYPE_REQUEST_FAILURE = "ADD_RISK_TYPE_REQUEST_FAILURE"

export const ADD_FIELD_TYPE_REQUEST = "ADD_FIELD_TYPE_REQUEST"
export const ADD_FIELD_TYPE_REQUEST_SUCCESS = "ADD_FIELD_TYPE_REQUEST_SUCCESS"
export const ADD_FIELD_TYPE_REQUEST_FAILURE = "ADD_FIELD_TYPE_REQUEST_FAILURE"
