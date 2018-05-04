import axios from 'axios';
import {
  FORUM_URL
} from './constants';
import { getConfig } from './user';
import { apiErrorHandler } from '../utils/errorhandler';
import {
  fetchHomeRequest,
  fetchHomeSuccess,
  fetchHomeFailure,
  fetchForumRequest,
  fetchForumSuccess,
  fetchForumFailure
} from '../actions';

export const fetchForums = () => dispatch => {
  dispatch(fetchHomeRequest());

  axios.get(FORUM_URL, getConfig())
  .then(response => {
    dispatch(fetchHomeSuccess(response.data));
  })
  .catch(error => {
    const errorMessage = apiErrorHandler(error);
    dispatch(fetchHomeFailure(errorMessage));
  });
};

export const fetchForum = (forum) => dispatch => {
  dispatch(fetchForumRequest());

  axios.get(FORUM_URL + forum, getConfig())
  .then(response => {
    dispatch(fetchForumSuccess(response.data));
  })
  .catch(error => {
    const errorMessage = apiErrorHandler(error);
    dispatch(fetchForumFailure(errorMessage));
  });
};
