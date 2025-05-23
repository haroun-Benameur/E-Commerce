import {USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT ,

    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,

    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_RESET,

    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_RESET,
} 
    from '../constants/userConstants'

    export const userLoginReducer  = (state ={userInfo:null}, action) => {
        switch (action.type) {
            case USER_LOGIN_REQUEST:
                return { ...state, loading: true };
    
            case USER_LOGIN_SUCCESS:
                return { ...state, loading: false, userInfo: action.payload, error: null };
    
            case USER_LOGIN_FAIL:
                return { ...state, loading: false, error: action.payload };
          
            case USER_LOGOUT:
               

                return { 
                   ...state,
                   userInfo:null
                 };
    
            
            
                default:
                return state;
        }
    };
    

    export const userRegisterReducer  = (state ={}, action) => {
        switch (action.type) {
            case USER_REGISTER_REQUEST:
                return { ...state, loading: true };
    
            case USER_REGISTER_SUCCESS:
                return { ...state, loading: false, userInfo: action.payload, error: null };
    
            case USER_REGISTER_FAIL:
                return { ...state, loading: false, error: action.payload };
          
            case USER_LOGOUT:
               

                return { 
                   ...state,
                   userInfo:null
                 };
    
            
            
                default:
                return state;
        }
    };
    


    export const userDetailsReducer  = (state ={user:{}}, action) => {
        switch (action.type) {
            case USER_DETAILS_REQUEST:
                return { ...state, loading: true };
    
            case USER_DETAILS_SUCCESS:
                return { ...state, loading: false, user: action.payload, error: null };
    
            case USER_DETAILS_FAIL:
                return { ...state, loading: false, error: action.payload };
          
            
            case USER_DETAILS_RESET:
                 return { user:{} };
            
                default:
                return state;
        }
    };
    


    export const userUpdateProfilReducer  = (state ={}, action) => {
        switch (action.type) {

            case USER_UPDATE_PROFILE_REQUEST:
                return {  loading: true };
    
            case USER_UPDATE_PROFILE_SUCCESS:
                return {  loading: false,success:true, user: action.payload, error: null };
    
            case USER_UPDATE_PROFILE_FAIL:
                return { success:false, loading: false, error: action.payload };
          
            case USER_UPDATE_PROFILE_RESET:
                return {};
            
            
                default:
                return state;
        }
    };
        