import axios from 'axios';
import {
  THREAD_URL,
  THREAD_CREATE_URL,
  THREAD_EDIT_URL,
  THREAD_DELETE_URL
} from './constants';
import { getConfig} from './user';
import { apiErrorHandler } from '../utils/errorhandler';
import {
  fetchThreadRequest,
  fetchThreadSuccess,
  fetchThreadFailure
} from '../actions';

export const fetchThread = (thread) => dispatch => {
  dispatch(fetchThreadRequest());

  axios.get(THREAD_URL + thread, null, getConfig())
  .then(response => {
    dispatch(fetchThreadSuccess(response.data));
  })
  .catch(error => {
    const errorMessage = apiErrorHandler(error);
    dispatch(fetchThreadFailure(errorMessage));
  });
};
