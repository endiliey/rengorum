import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from './types';

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST
  };
};

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    token: data.token,
    username: data.username,
    name: data.name,
    avatar: data.avatar,
    isStaff: data.is_staff
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    error
  };
};

export const logoutAction = () => {
  return {
    type: LOGOUT
  };
};
