import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from './types';
import {fetchUsersApi} from '../api';
import {apiErrorHandler} from '../utils/errorhandler';

export const fetchUsers = () => dispatch => {
  dispatch(fetchUsersRequest());

  fetchUsersApi()
    .then(response => {
      dispatch(fetchUsersSuccess(response.data));
    })
    .catch(error => {
      const errorMessage = apiErrorHandler(error);
      dispatch(fetchUsersFailure(errorMessage));
    });
};

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

export const fetchUsersSuccess = data => {
  return {
    type: FETCH_USERS_SUCCESS,
    users: data,
  };
};

export const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    error,
  };
};
