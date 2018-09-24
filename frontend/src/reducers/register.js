import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_RESET,
} from '../actions/types';

const initialState = {
  isLoading: false,
  error: null,
};

const register = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case REGISTER_SUCCESS:
      return {
        isLoading: false,
        error: null,
      };
    case REGISTER_FAILURE:
      return {
        isLoading: false,
        error: action.error,
      };
    case REGISTER_RESET:
      return initialState;
    default:
      return state;
  }
};

export default register;
