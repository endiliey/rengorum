import axios from 'axios';
import {FORUM_URL} from './constants';
import {getConfig} from '../utils/config';

export const fetchForumsApi = () => {
  return axios.get(FORUM_URL, getConfig());
};

export const fetchForumApi = forum => {
  return axios.get(FORUM_URL + forum, getConfig());
};
