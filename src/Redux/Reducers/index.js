import { combineReducers } from 'redux';
import { errorReducer } from './ErrorReducer';
import { statusReducer } from './StatusReducer';
import  userReducer  from './UserReducer';


export const rootReducer = combineReducers({
  error: errorReducer,
  status: statusReducer,
  user: userReducer,
});
