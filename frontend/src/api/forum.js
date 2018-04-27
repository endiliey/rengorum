import axios from 'axios';
import {
  FORUM_URL,
  FORUM_CREATE_URL,
  FORUM_EDIT_URL,
  FORUM_DELETE_URL
} from './constants';
import {
  getConfig
} from './user';
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

  axios.get(FORUM_URL, null, getConfig())
  .then(function (response) {
    dispatch(fetchHomeSuccess(response.data));
  })
  .catch(function (error) {
    let errorMessage = "Unknown Error";
    if (!error.response) {
      errorMessage = "Error: Network Error";
    } else if (error.response.data.detail){
      errorMessage = "Forums: " + error.response.data.detail;
    }
    dispatch(fetchHomeFailure(errorMessage));
  });
};

export const fetchForum = (forum) => dispatch => {
  dispatch(fetchForumRequest());

  axios.get(FORUM_URL + forum, null, getConfig())
  .then(function (response) {
    dispatch(fetchForumSuccess(response.data));
  })
  .catch(function (error) {
    let errorMessage = "Unknown Error";
    if (!error.response) {
      errorMessage = "Error: Network Error";
    } else if (error.response.data.detail){
      errorMessage = "Forum: " + error.response.data.detail;
    }
    dispatch(fetchForumFailure(errorMessage));
  });
};
