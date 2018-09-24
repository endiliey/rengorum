import {
  FETCH_FORUM_REQUEST,
  FETCH_FORUM_SUCCESS,
  FETCH_FORUM_FAILURE,
} from './types';
import {fetchForumApi} from '../api';
import {apiErrorHandler} from '../utils/errorhandler';

export const fetchForum = forum => dispatch => {
  dispatch(fetchForumRequest());

  fetchForumApi(forum)
    .then(response => {
      dispatch(fetchForumSuccess(response.data));
    })
    .catch(error => {
      const errorMessage = apiErrorHandler(error);
      dispatch(fetchForumFailure(errorMessage));
    });
};

export const fetchForumRequest = () => {
  return {
    type: FETCH_FORUM_REQUEST,
  };
};

export const fetchForumSuccess = forum => {
  return {
    type: FETCH_FORUM_SUCCESS,
    name: forum.name,
    slug: forum.slug,
    description: forum.description,
    threads: forum.threads,
  };
};

export const fetchForumFailure = error => {
  return {
    type: FETCH_FORUM_FAILURE,
    error,
  };
};
