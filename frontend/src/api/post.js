import axios from 'axios';
import {
  POST_CREATE_URL
} from './constants';
import { getConfig } from './user';
import { fetchThread } from './thread';
import { apiErrorHandler } from '../utils/errorhandler';
import {
  createPostRequest,
  createPostSuccess,
  createPostFailure
} from '../actions';

export const createPost = newPost => dispatch => {
  dispatch(createPostRequest());

  axios.post(POST_CREATE_URL, newPost, getConfig())
  .then(response => {
    dispatch(createPostSuccess());

    // re-load thread page
    dispatch(fetchThread(newPost.thread_id));
  })
  .catch(error => {
    const errorMessage = apiErrorHandler(error);
    dispatch(createPostFailure(errorMessage));
  });
};
