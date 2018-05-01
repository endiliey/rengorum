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

export const fetchForumSuccess = (forum) => {
  return {
    type: FETCH_FORUM_SUCCESS,
    name: forum.name,
    slug: forum.slug,
    description: forum.description,
    threads: forum.threads
  };
};

export const fetchForumFailure = (error) => {
  return {
    type: FETCH_FORUM_FAILURE,
    error
  };
};
