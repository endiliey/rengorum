import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from '../actions/types';

const initialState = {
  isFetching: false
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
        isFetching: false
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
}

export default register;
