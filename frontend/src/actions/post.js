import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
} from './types';
import {createPostApi, fetchThreadApi, deletePostApi} from '../api';
import {fetchThreadSuccess, fetchThreadFailure} from './thread';
import {apiErrorHandler} from '../utils/errorhandler';

export const createPost = newPost => dispatch => {
  dispatch(createPostRequest());

  createPostApi(newPost)
    .then(response => {
      dispatch(createPostSuccess());

      // re-load thread page
      fetchThreadApi(newPost.thread_id)
        .then(response => {
          dispatch(fetchThreadSuccess(response.data));
        })
        .catch(error => {
          const errorMessage = apiErrorHandler(error);
          dispatch(fetchThreadFailure(errorMessage));
        });
    })
    .catch(error => {
      const errorMessage = apiErrorHandler(error);
      dispatch(createPostFailure(errorMessage));
    });
};

export const createPostRequest = newPost => {
  return {
    type: CREATE_POST_REQUEST,
  };
};

export const createPostSuccess = () => {
  return {
    type: CREATE_POST_SUCCESS,
  };
};

export const createPostFailure = error => {
  return {
    type: CREATE_POST_FAILURE,
    error,
  };
};

export const deletePost = (id, threadID) => dispatch => {
  dispatch(deletePostRequest(id));

  deletePostApi(id)
    .then(response => {
      dispatch(deletePostSuccess(id));

      // re-load thread page
      fetchThreadApi(threadID)
        .then(response => {
          dispatch(fetchThreadSuccess(response.data));
        })
        .catch(error => {
          const errorMessage = apiErrorHandler(error);
          dispatch(fetchThreadFailure(errorMessage));
        });
    })
    .catch(error => {
      const errorMessage = apiErrorHandler(error);
      dispatch(deletePostFailure(id, errorMessage));
    });
};

export const deletePostRequest = id => {
  return {
    type: DELETE_POST_REQUEST,
    id,
  };
};

export const deletePostSuccess = id => {
  return {
    type: DELETE_POST_SUCCESS,
    id,
  };
};

export const deletePostFailure = (id, error) => {
  return {
    type: DELETE_POST_FAILURE,
    id,
    error,
  };
};
