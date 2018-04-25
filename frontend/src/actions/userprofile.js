import {
  FETCH_USER_PROFILE_REQUEST,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILURE
} from './types';

export const fetchUserProfileRequest = () => {
  return {
    type: FETCH_USER_PROFILE_REQUEST,
  };
};

export const fetchUserProfileSuccess = (data) => {
  return {
    type: FETCH_USER_PROFILE_SUCCESS,
    profile: data
  };
};

export const fetchUserProfileFailure = (error) => {
  return {
    type: FETCH_USER_PROFILE_FAILURE,
    error
  };
};
