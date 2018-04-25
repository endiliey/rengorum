import {
  FETCH_HOME_REQUEST,
  FETCH_HOME_SUCCESS,
  FETCH_HOME_FAILURE,
} from './types';

export const fetchHomeRequest = () => {
  return {
    type: FETCH_HOME_REQUEST
  };
};

export const fetchHomeSuccess = (data) => {
  return {
    type: FETCH_HOME_SUCCESS,
    forums: data
  };
};

export const fetchHomeFailure = (error) => {
  return {
    type: FETCH_HOME_FAILURE,
    error
  };
};
