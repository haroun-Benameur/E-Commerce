import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from '../constants/productConstants';

export const productListReducers = (state = { loading: false, products: [], error: null }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { ...state, loading: true };

        case PRODUCT_LIST_SUCCESS:
            return { ...state, loading: false, products: action.payload, error: null };

        case PRODUCT_LIST_FAIL:
            return { ...state, loading: false, products: [], error: action.payload };

        default:
            return state;
    }
};


export const productDetailReducers = (state = { loading: false, product:[], error: null }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { ...state, loading: true };

        case PRODUCT_DETAILS_SUCCESS:
            return { ...state, loading: false, product: action.payload, error: null };

        case PRODUCT_DETAILS_FAIL:
            return { ...state, loading: false, product: [], error: action.payload };

        default:
            return state;
    }
};

