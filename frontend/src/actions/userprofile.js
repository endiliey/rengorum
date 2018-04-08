import axios from 'axios';
import {
  FETCH_USER_PROFILE_REQUEST,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILURE
} from './types';
import { API_URL, USER_PROFILE_URL } from './api';

export const fetchUserProfile = username => dispatch => {
  dispatch(fetchUserProfileRequest);

  axios.get(API_URL + USER_PROFILE_URL + username)
  .then(function (response) {
    dispatch(fetchUserProfileSuccess(response.data));
  })
  .catch(function (error) {
    var errorMessage = "Unknown Error";
    if (!error.response) {
      errorMessage = "Error: Network Error";
    } else if (error.response.data.detail){
      errorMessage = "User: " + error.response.data.detail;
    }
    dispatch(fetchUserProfileFailure(errorMessage));
  });
};

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
