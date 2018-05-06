import {
  FETCH_THREAD_REQUEST,
  FETCH_THREAD_SUCCESS,
  FETCH_THREAD_FAILURE,
  CREATE_THREAD_REQUEST,
  CREATE_THREAD_SUCCESS,
  CREATE_THREAD_FAILURE,
  CREATE_THREAD_SAVE,
  CREATE_THREAD_TOGGLE
} from './types';
import {
  fetchThreadApi,
  createThreadApi,
  fetchForumApi
} from '../api';
import { fetchForumSuccess, fetchForumFailure } from './forum';
import { apiErrorHandler } from '../utils/errorhandler';

export const fetchThread = thread => dispatch => {
  dispatch(fetchThreadRequest());

  fetchThreadApi(thread)
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

  createThreadApi(newThread)
  .then(response => {
    dispatch(createThreadSuccess(response.data));

    // re-load forum page
    fetchForumApi(newThread.forum)
    .then(response => {
      dispatch(fetchForumSuccess(response.data));
    })
    .catch(error => {
      const errorMessage = apiErrorHandler(error);
      dispatch(fetchForumFailure(errorMessage));
    });
  })
  .catch(error => {
    const errorMessage = apiErrorHandler(error);
    dispatch(createThreadFailure(errorMessage));
  });
};

export const fetchThreadRequest = () => {
  return {
    type: FETCH_THREAD_REQUEST,
  };
};

export const fetchThreadSuccess = (thread) => {
  return {
    type: FETCH_THREAD_SUCCESS,
    thread
  };
};

export const fetchThreadFailure = (error) => {
  return {
    type: FETCH_THREAD_FAILURE,
    error
  };
};

export const createThreadRequest = (newThread) => {
  return {
    type: CREATE_THREAD_REQUEST,
    newThread
  };
};

export const createThreadSuccess = (newThread) => {
  return {
    type: CREATE_THREAD_SUCCESS,
    newThread
  };
};

export const createThreadFailure = (error) => {
  return {
    type: CREATE_THREAD_FAILURE,
    error
  };
};

export const createThreadSave = (newThread) => {
  return {
    type: CREATE_THREAD_SAVE,
    name: newThread.name,
    content: newThread.content
  };
};

export const createThreadToggle = () => {
  return {
    type: CREATE_THREAD_TOGGLE
  };
};
