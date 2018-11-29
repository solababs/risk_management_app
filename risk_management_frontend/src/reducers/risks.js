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


const initialState = {
    isGettingRiskTypes: false,
    getRiskTypesError: null,
    riskTypes: [],
    isAddingRiskType: false,
    addRiskTypeError: null,
    riskType: {},
    isGettingFieldTypes: false,
    getFieldTypesError: null,
    fieldTypes: [],
    isAddingFieldType: false,
    addFieldTypeError: null,
    fieldType: {}
};

function auth(state = initialState, action) {
    switch (action.type) {
        case GET_FIELD_TYPES_REQUEST:
            return Object.assign({}, state, {
                isGettingFieldTypes: true,
                getFieldTypesError: null,
                fieldTypes: [],
            })

        case GET_FIELD_TYPES_REQUEST_SUCCESS:
            return Object.assign({}, state, {
                isGettingFieldTypes: false,
                getFieldTypesError: null,
                fieldTypes: action.payload.results,
            })

        case GET_FIELD_TYPES_REQUEST_FAILURE:
            return Object.assign({}, state, {
                isGettingFieldTypes: false,
                getFieldTypesError: action.error
            })

        case ADD_FIELD_TYPE_REQUEST:
            return Object.assign({}, state, {
                isAddingFieldType: true,
                addFieldTypeError: null,
                fieldType: {},
            })

        case ADD_FIELD_TYPE_REQUEST_SUCCESS:
            let newFieldTypes = state.fieldTypes
            newFieldTypes.push(action.payload)

            return Object.assign({}, state, {
                isAddingFieldType: false,
                addFieldTypeError: null,
                fieldType: action.payload,
                fieldTypes: newFieldTypes
            })

        case ADD_FIELD_TYPE_REQUEST_FAILURE:
            return Object.assign({}, state, {
                isAddingFieldType: false,
                addFieldTypeError: action.error,
                fieldType: {}
            })

        case GET_RISK_TYPES_REQUEST:
            return Object.assign({}, state, {
                isGettingRiskTypes: true,
                getRiskTypesError: null,
                riskTypes: [],
            })

        case GET_RISK_TYPES_REQUEST_SUCCESS:
            return Object.assign({}, state, {
                isGettingRiskTypes: false,
                getRiskTypesError: null,
                riskTypes: action.payload.results,
            })

        case GET_RISK_TYPES_REQUEST_FAILURE:
            return Object.assign({}, state, {
                isGettingRiskTypes: false,
                getRiskTypesError: action.error
            })

        case ADD_RISK_TYPE_REQUEST:
            return Object.assign({}, state, {
                isAddingRiskType: true,
                addRiskTypeError: null,
                riskType: {},
            })

        case ADD_RISK_TYPE_REQUEST_SUCCESS:
            let newRiskTypes = state.riskTypes
            newRiskTypes.push(action.payload)

            return Object.assign({}, state, {
                isAddingRiskType: false,
                addRiskTypeError: null,
                riskType: action.payload,
                riskTypes: newRiskTypes
            })

        case ADD_RISK_TYPE_REQUEST_FAILURE:
            return Object.assign({}, state, {
                isAddingRiskType: false,
                addRiskTypeError: action.error,
                riskType: {}
            })

        default:
            return state
    }
}

export default auth