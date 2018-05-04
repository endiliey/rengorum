import axios from 'axios';
import {
  THREAD_URL,
  THREAD_CREATE_URL
} from './constants';
import { getConfig } from './user';
import { fetchForum } from './forum';
import { apiErrorHandler } from '../utils/errorhandler';
import {
  fetchThreadRequest,
  fetchThreadSuccess,
  fetchThreadFailure,
  createThreadRequest,
  createThreadSuccess,
  createThreadFailure
} from '../actions';

export const fetchThread = thread => dispatch => {
  dispatch(fetchThreadRequest());

  axios.get(THREAD_URL + thread, getConfig())
  .then(response => {
    dispatch(fetchThreadSuccess(response.data));
  })
  .catch(error => {
    const errorMessage = apiErrorHandler(error);
    dispatch(fetchThreadFailure(errorMessage));
  });
};

export const createThread = newThread => dispatch => {
  dispatch(createThreadRequest(newThread));

  axios.post(THREAD_CREATE_URL, newThread, getConfig())
  .then(response => {
    dispatch(createThreadSuccess(response.data));

    // re-load forum page
    dispatch(fetchForum(newThread.forum));
  })
  .catch(error => {
    const errorMessage = apiErrorHandler(error);
    dispatch(createThreadFailure(errorMessage));
  });
};
