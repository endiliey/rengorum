import {
  FETCH_THREAD_REQUEST,
  FETCH_THREAD_SUCCESS,
  FETCH_THREAD_FAILURE
} from './types';

export const fetchThreadRequest = () => {
  return {
    type: FETCH_THREAD_REQUEST,
  };
};

export const fetchThreadSuccess = (data) => {
  return {
    type: FETCH_THREAD_SUCCESS,
    thread: data
  };
};

export const fetchThreadFailure = (error) => {
  return {
    type: FETCH_THREAD_FAILURE,
    error
  };
};
