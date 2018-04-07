import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from '../actions/types';

const initialState = {
  isFetching: false,
  error: null
};

const register = (state = initialState, action) => {
  switch(action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}

export default register;
