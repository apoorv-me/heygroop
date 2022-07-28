import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import thunk from 'redux-thunk'
const rootReducer = combineReducers({
        user:userReducer,
    })
export default configureStore({
    reducer:rootReducer,
    middleware : [thunk]
});
