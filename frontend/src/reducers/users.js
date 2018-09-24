import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from '../actions/types';

const initialState = {
  isLoading: false,
  users: null,
  error: null,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_USERS_SUCCESS:
      return {
        isLoading: false,
        users: action.users,
        error: null,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...initialState,
        error: action.error,
      };
    default:
      return state;
  }
};

export default users;
