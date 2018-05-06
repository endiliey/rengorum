import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE
} from './types';

export const createPostRequest = (newPost) => {
  return {
    type: CREATE_POST_REQUEST
  };
};

export const createPostSuccess = () => {
  return {
    type: CREATE_POST_SUCCESS
  };
};

export const createPostFailure = (error) => {
  return {
    type: CREATE_POST_FAILURE,
    error
  };
};
