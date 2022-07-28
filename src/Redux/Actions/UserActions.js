import { HttpClient, UserController } from '../Controllers';
import { resetGlobal } from './GlobalActions';
 

export const TYPES = {
  CLEAR_STORE: 'CLEAR_STORE',
  LOGIN: 'LOGIN',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  OTP: 'OTP',
  OTP_REQUEST: 'OTP_REQUEST',
  OTP_ERROR: 'OTP_ERROR',
  OTP_SUCCESS: 'OTP_SUCCESS',
  FORGOT: 'FORGOT',
  FORGOT_REQUEST: 'FORGOT_REQUEST',
  FORGOT_ERROR: 'FORGOT_ERROR',
  FORGOT_SUCCESS: 'FORGOT_SUCCESS',
  UPLOAD: 'UPLOAD',
  UPLOAD_REQUEST: 'UPLOAD_REQUEST',
  UPLOAD_ERROR: 'UPLOAD_ERROR',
  UPLOAD_SUCCESS: 'UPLOAD_SUCCESS',
  RESETPASSWORD: 'RESETPASSWORD',
  RESETPASSWORD_REQUEST: 'RESETPASSWORD_REQUEST',
  RESETPASSWORD_ERROR: 'RESETPASSWORD_ERROR',
  RESETPASSWORD_SUCCESS: 'RESETPASSWORD_SUCCESS',
  RESENDOTP: 'RESENDOTP',
  RESENDOTP_REQUEST: 'RESENDOTP_REQUEST',
  RESENDOTP_ERROR: 'RESENDOTP_ERROR',
  RESENDOTP_SUCCESS: 'RESENDOTP_SUCCESS',
  USERAVATARLIST_REQUEST: 'USERAVATARLIST_REQUEST',
  USERAVATARLIST_ERROR: 'USERAVATARLIST_ERROR',
  USERAVATARLIST_SUCCESS: 'USERAVATARLIST_SUCCESS',
  USER_LIST:'USER_LIST',
  USER_LIST_REQUEST: 'USER_LIST_REQUEST',
  USER_LIST_ERROR: 'USER_LIST_ERROR',
  USER_LIST_SUCCESS: 'USER_LIST_SUCCESS',
  GROUP_LIST:'GROUP_LIST',
  GROUP_LIST_REQUEST: 'GROUP_LIST_REQUEST',
  GROUP_LIST_ERROR: 'GROUP_LIST_ERROR',
  GROUP_LIST_SUCCESS: 'GROUP_LIST_SUCCESS',
  CHANGE_PASSWORD:'CHANGE_PASSWORD',
  CHANGE_PASSWORD_REQUEST: 'CHANGE_PASSWORD_REQUEST',
  CHANGE_PASSWORD_ERROR: 'CHANGE_PASSWORD_ERROR',
  CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS',
  BLOCK_UNBLOCK:'BLOCK_UNBLOCK',
  BLOCK_UNBLOCK_REQUEST: 'BLOCK_UNBLOCK_REQUEST',
  BLOCK_UNBLOCK_ERROR: 'BLOCK_UNBLOCK_ERROR',
  BLOCK_UNBLOCK_SUCCESS: 'BLOCK_UNBLOCK_SUCCESS',
  GROUP_ACTIVE:'GROUP_ACTIVE',
  GROUP_ACTIVE_REQUEST: 'GROUP_ACTIVE_REQUEST',
  GROUP_ACTIVE_ERROR: 'GROUP_ACTIVE_ERROR',
  GROUP_ACTIVE_SUCCESS: 'GROUP_ACTIVE_SUCCESS',
  LOGOUT:'LOGOUT',
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_ERROR: 'LOGOUT_ERROR',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS_SUCCESS',

};

const otpRequest = () => ({
  type: TYPES.OTP_REQUEST,
  payload: null,
});

const otpSuccess = () => ({
  type: TYPES.OTP_SUCCESS,
  payload: null,
});
const otpError = (error) => ({
  type: TYPES.OTP_ERROR,
  payload: { error },
});

const forgotRequest = () => ({
  type: TYPES.FORGOT_REQUEST,
  payload: null,
});

const forgotSuccess = () => ({
  type: TYPES.FORGOT_SUCCESS,
  payload: null,
});

const forgotError = (error) => ({
  type: TYPES.FORGOT_ERROR,
  payload: { error },
});

const resendOtpError = (error) => ({
  type: TYPES.RESENDOTP_ERROR,
  payload: { error },
});

const resendOtpRequest = () => ({
  type: TYPES.RESENDOTP_REQUEST,
  payload: null,
});

const resendOtpSuccess = () => ({
  type: TYPES.RESENDOTP_SUCCESS,
  payload: null,
});

const userListError = (error) => ({
  type: TYPES.USER_LIST_ERROR,
  payload: { error },
});

const userListRequest = () => ({
  type: TYPES.USER_LIST_REQUEST,
  payload: null,
});

const userListSuccess = () => ({
  type: TYPES.USER_LIST_SUCCESS,
  payload: null,
});

const groupListError = (error) => ({
  type: TYPES.GROUP_LIST_ERROR,
  payload: { error },
});

const groupListRequest = () => ({
  type: TYPES.GROUP_LIST_REQUEST,
  payload: null,
});

const groupListSuccess = () => ({
  type: TYPES.GROUP_LIST_SUCCESS,
  payload: null,
});

const changePasswordError = (error) => ({
  type: TYPES.CHANGE_PASSWORD_ERROR,
  payload: { error },
});

const changePasswordRequest = () => ({
  type: TYPES.CHANGE_PASSWORD_REQUEST,
  payload: null,
});

const changePasswordSuccess = () => ({
  type: TYPES.CHANGE_PASSWORD_SUCCESS,
  payload: null,
});

const blockUnblockError = (error) => ({
  type: TYPES.BLOCK_UNBLOCK_ERROR,
  payload: { error },
});

const blockUnblockRequest = () => ({
  type: TYPES.BLOCK_UNBLOCK_REQUEST,
  payload: null,
});

const blockUnblockSuccess = () => ({
  type: TYPES.BLOCK_UNBLOCK_SUCCESS,
  payload: null,
});

const groupActiveError = (error) => ({
type: TYPES.GROUP_ACTIVE_ERROR,
  payload: { error },
});

const groupActiveRequest = () => ({
  type: TYPES.GROUP_ACTIVE_REQUEST,
  payload: null,
});

const groupActiveSuccess = () => ({
  type: TYPES.GROUP_ACTIVE_SUCCESS,
  payload: null,
});

const resetRequest = () => ({
  type: TYPES.RESETPASSWORD_REQUEST,
  payload: null,
});

const resetSuccess = () => ({
  type: TYPES.RESETPASSWORD_SUCCESS,
  payload: null,
});
const resetError = (error) => ({
  type: TYPES.RESETPASSWORD_ERROR,
  payload: { error },
});

const loginRequest = () => ({
  type: TYPES.LOGIN_REQUEST,
  payload: null,
});

const loginSuccess = (data) => ({
  type: TYPES.LOGIN_SUCCESS,
  payload: { data },
});
const logoutSuccess = () => ({
  type: TYPES.LOGIN,
  payload: null,
});

const loginError = (error) => ({
  type: TYPES.LOGIN_ERROR,
  payload: { error },
});

const signupRequest = () => ({
  type: TYPES.SIGNUP_REQUEST,
  payload: null,
});
const signupSuccess = (user) => ({
  type: TYPES.SIGNUP_SUCCESS,
  payload: { user },
});

const signupError = (error) => ({
  type: TYPES.SIGNUP_ERROR,
  payload: { error },
});


const clearStore = () => ({
  type: TYPES.CLEAR_STORE,
  payload: null,
});

const uploadFileRequest = () => ({
  type: TYPES.UPLOAD_REQUEST,
  payload: null,
});

const uploadFileSuccess = (user) => ({
  type: TYPES.UPLOAD_SUCCESS,
  payload: { user },
});


const uploadFileError = (error) => ({
  type: TYPES.UPLOAD_ERROR,
  payload: { error },
});


 

export const login = (params) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const data = await UserController.login(params);
     HttpClient.setAuthorization(data?.data?.token)
    dispatch(loginSuccess(data.data));

  } catch (error) {
    dispatch(loginError(error.message));
  }
};

export const otp = (params,callback) => async (dispatch) => {
  dispatch(otpRequest());
  try {
    const data = await UserController.verification(params);
    callback(data)
    dispatch(otpSuccess(data.data));
  } catch (error) {
    dispatch(otpError(error.message));
  }
};

export const ForgotPassword = (params,callback) => async (dispatch) => {
  dispatch(forgotRequest());
  try {
    const data = await UserController.forgot(params);
    callback(data)
    dispatch(forgotSuccess());

  } catch (error) {
    dispatch(forgotError(error.message));
  }
};

export const ChangePassword = (params,callback) => async (dispatch) => {
  dispatch(changePasswordRequest());
  try {
    const data = await UserController.changePassword(params);
    callback(data)
    dispatch(changePasswordSuccess());

  } catch (error) {
    dispatch(changePasswordError(error.message));
  }
};


export const BlockUnBlock = (params,callback) => async (dispatch) => {
  dispatch(blockUnblockRequest());
  try {
    const data = await UserController.blockUnblock(params);
    callback(data)
    dispatch(blockUnblockSuccess());

  } catch (error) {
    dispatch(blockUnblockError(error.message));
  }
};


export const GroupActive = (params,callback) => async (dispatch) => {
  dispatch(groupActiveRequest());
  try {
    const data = await UserController.groupStatus(params);
    callback(data)
    dispatch(groupActiveSuccess());

  } catch (error) {
    dispatch(groupActiveError(error.message));
  }
};


export const ResendOTP = (params,callback) => async (dispatch) => {
  dispatch(resendOtpRequest());
  try {
    const data = await UserController.resendotp(params);
    callback(data)
    dispatch(resendOtpSuccess());

  } catch (error) {
    dispatch(resendOtpError(error.message));
  }
};

export const ResetPassword = (params, callback) => async (dispatch) => {
  dispatch(resetRequest());
  try {
    const data = await UserController.reset(params);
    callback(data);
    dispatch(resetSuccess());
  } catch (error) {
    dispatch(resetError(error.message));
  }
};

export const createUserDetails = (userdata) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const data = await UserController.createUserDetails(userdata);
    dispatch(loginSuccess(data.data));
    dispatch(clearotpError())
  } catch (error) {
    console.log(error);
    dispatch(loginError(error.message));
  }
}


export const userList = (params,callback) => async (dispatch) => {
  dispatch(userListRequest());
  try {
    const data = await UserController.userList();
    callback(data)
    dispatch(userListSuccess(data.data));
  } catch (error) {
    dispatch(userListError(error.message));
  }
}


export const groupList = (params,callback) => async (dispatch) => {
  dispatch(groupListRequest());
  try {
    const data = await UserController.groupList();
    callback(data)
    dispatch(groupListSuccess(data.data));
  } catch (error) {
    dispatch(groupListError(error.message));
  }
}

export const clearotpError = () => async (dispatch) => {
  dispatch(otpError(""));
  dispatch(loginError(""));

};

export const signup = (params, cancelToken) => async (dispatch) => {
  dispatch(signupRequest());
  try {
    const data = await UserController.signup(params, cancelToken);
    dispatch(signupSuccess(data.user));

  } catch (error) {
    dispatch(signupError(error.message));
  }
};


export const uploadProfilePicture = (data, callback) => async (dispatch) => {
  dispatch(uploadFileRequest());
  try {
    const user = await UserController.uploadimage(data);
    dispatch(uploadFileSuccess(user.user));
    callback(true)
  } catch (error) {
    callback(false)
    dispatch(uploadFileError(error.message));
  }
}


export const logout = () => async (dispatch) => {

  try {
    await UserController.logout();
    // HttpClient.clearAuthorization()
    await dispatch(resetGlobal())
    logoutSuccess()
  } finally {
    dispatch(clearStore());
  }
};
 