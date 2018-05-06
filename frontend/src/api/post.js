import axios from 'axios';
import {
  POST_CREATE_URL
} from './constants';
import { getConfig } from '../utils/config';

export const createPostApi = newPost => {
  return axios.post(POST_CREATE_URL, newPost, getConfig());
};
