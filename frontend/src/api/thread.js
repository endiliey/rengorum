import axios from 'axios';
import {
  THREAD_URL,
  THREAD_CREATE_URL,
  THREAD_EDIT_URL,
  THREAD_DELETE_URL
} from './constants';
import {
  getConfig
} from './user';
import {
  fetchThreadRequest,
  fetchThreadSuccess,
  fetchThreadFailure
} from '../actions';

export const fetchThread = (thread) => dispatch => {
  dispatch(fetchThreadRequest());

  axios.get(THREAD_URL + thread, null, getConfig())
  .then(function (response) {
    dispatch(fetchThreadSuccess(response.data));
  })
  .catch(function (error) {
    let errorMessage = "Unknown Error";
    if (!error.response) {
      errorMessage = "Error: Network Error";
    } else if (error.response.data.detail){
      errorMessage = "Thread: " + error.response.data.detail;
    }
    dispatch(fetchThreadFailure(errorMessage));
  });
};
