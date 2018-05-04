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
