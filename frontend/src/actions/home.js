import {
  FETCH_HOME_REQUEST,
  FETCH_HOME_SUCCESS,
  FETCH_HOME_FAILURE,
} from './types';
import {fetchForumsApi} from '../api';
import {apiErrorHandler} from '../utils/errorhandler';

export const fetchForums = () => dispatch => {
  dispatch(fetchHomeRequest());

  fetchForumsApi()
    .then(response => {
      dispatch(fetchHomeSuccess(response.data));
    })
    .catch(error => {
      const errorMessage = apiErrorHandler(error);
      dispatch(fetchHomeFailure(errorMessage));
    });
};

export const fetchHomeRequest = () => {
  return {
    type: FETCH_HOME_REQUEST,
  };
};

export const fetchHomeSuccess = data => {
  return {
    type: FETCH_HOME_SUCCESS,
    forums: data,
  };
};

export const fetchHomeFailure = error => {
  return {
    type: FETCH_HOME_FAILURE,
    error,
  };
};
