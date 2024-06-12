import {applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { legacy_createStore as createStore} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducers,productDetailReducers } from './reducers/productReducers';
import { cartReducer } from './reducers/CartReducer';
import {userLoginReducer,userRegisterReducer,userDetailsReducer,userUpdateProfilReducer} from './reducers/UserReducers'

const reducer=combineReducers({
    productList:productListReducers,
    productDetails:productDetailReducers,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfil:userUpdateProfilReducer
})

const CartItemsFromStorage=localStorage.getItem('cartItems') ?
JSON.parse(localStorage.getItem("cartItems")) : []; //convert to js object

const UserInfoFromStorage=localStorage.getItem('userInfo') ?
JSON.parse(localStorage.getItem("userInfo")) : null;

const initialState = {
  cart:{cartItems:CartItemsFromStorage},
  userLogin: { 
    userInfo: UserInfoFromStorage
  }
};
const middleware = [thunk];

const store = createStore(
  reducer, // Use the combined reducer
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
