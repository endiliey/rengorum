import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from './types';

export const registerRequest = () => {
  return {
    type: REGISTER_REQUEST
  };
};

export const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS
  };
};

export const registerFailure = (error) => {
  return {
    type: REGISTER_FAILURE,
    error
  };
};
