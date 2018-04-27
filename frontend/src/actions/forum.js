import {
  FETCH_FORUM_REQUEST,
  FETCH_FORUM_SUCCESS,
  FETCH_FORUM_FAILURE
} from './types';

export const fetchForumRequest = () => {
  return {
    type: FETCH_FORUM_REQUEST,
  };
};

export const fetchForumSuccess = (data) => {
  return {
    type: FETCH_FORUM_SUCCESS,
    forum: data
  };
};

export const fetchForumFailure = (error) => {
  return {
    type: FETCH_FORUM_FAILURE,
    error
  };
};
