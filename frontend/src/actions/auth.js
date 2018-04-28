import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_RESET,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,
  EDIT_PROFILE_RESET,
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

export const loginReset = () => {
  return {
    type: LOGIN_RESET
  };
};

export const editProfileRequest = () => {
  return {
    type: EDIT_PROFILE_REQUEST
  };
};

export const editProfileSuccess = (newProfile) => {
  return {
    type: EDIT_PROFILE_SUCCESS,
    avatar: newProfile.avatar,
    name: newProfile.name,
  };
};

export const editProfileFailure = (error) => {
  return {
    type: EDIT_PROFILE_FAILURE,
    error
  };
};

export const editProfileReset = () => {
  return {
    type: EDIT_PROFILE_RESET
  };
};
