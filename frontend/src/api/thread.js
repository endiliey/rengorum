import axios from 'axios';
import {
  THREAD_URL,
  THREAD_CREATE_URL
} from './constants';
import { getConfig } from '../utils/config';

export const fetchThreadApi = thread => {
  return axios.get(THREAD_URL + thread, getConfig());
};

export const createThreadApi = newThread => {
  return axios.post(THREAD_CREATE_URL, newThread, getConfig());
};
