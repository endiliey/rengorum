import axios from 'axios';
import {
  POST_URL,
  POST_DELETE_URL,
  POST_CREATE_URL,
  POST_EDIT_URL,
} from './constants';
import {getConfig} from '../utils/config';

export const createPostApi = newPost => {
  return axios.post(POST_CREATE_URL, newPost, getConfig());
};

export const deletePostApi = id => {
  return axios.delete(POST_URL + id + POST_DELETE_URL, getConfig());
};

export const editPostApi = (id, content) => {
  return axios.put(
    POST_URL + id + POST_EDIT_URL,
    {content: content},
    getConfig(),
  );
};
