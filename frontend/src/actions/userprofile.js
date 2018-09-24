import {
  FETCH_USER_PROFILE_REQUEST,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILURE,
} from './types';
import {fetchUserProfileApi} from '../api';
import {apiErrorHandler} from '../utils/errorhandler';

export const fetchUserProfile = username => dispatch => {
  dispatch(fetchUserProfileRequest());

  fetchUserProfileApi(username)
    .then(response => {
      dispatch(fetchUserProfileSuccess(response.data));
    })
    .catch(error => {
      const errorMessage = apiErrorHandler(error);
      dispatch(fetchUserProfileFailure(errorMessage));
    });
};

export const fetchUserProfileRequest = () => {
  return {
    type: FETCH_USER_PROFILE_REQUEST,
  };
};

export const fetchUserProfileSuccess = data => {
  return {
    type: FETCH_USER_PROFILE_SUCCESS,
    profile: data,
  };
};

export const fetchUserProfileFailure = error => {
  return {
    type: FETCH_USER_PROFILE_FAILURE,
    error,
  };
};
