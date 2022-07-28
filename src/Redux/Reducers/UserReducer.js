import { TYPES } from '../Actions/UserActions';

const userReducer = (state = {},{ payload, type } )  => {
  switch (type) {
    case TYPES.LOGIN_SUCCESS:
      return { ...payload.data };
    case TYPES.UPDATE_SUCCESS:
      return { ...payload.data };
    case TYPES.UPLOAD_SUCCESS:
      return { ...payload.data };
    case TYPES.RESETPASSWORD_SUCCESS:
      return {};
    case TYPES.CLEAR_STORE:
      return {};
    default:
      return state;
  }
};
export default userReducer;