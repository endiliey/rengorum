import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from '../actions/types';

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  username: null,
  avatar: null,
  token: null
};

const auth = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        token: action.token,
        username: action.username,
        avatar: action.avatar
      };
    case LOGIN_FAILURE:
      return {
          ...state,
          isFetching: false,
          isAuthenticated: false,
          token: null,
          username: null,
          avatar: null
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        token: null,
        username: null,
        avatar: null
      };
    case LOGOUT_FAILURE:
      return {
          ...state,
          isFetching: false,
          isAuthenticated: true
      };
    default:
      return state;
  }
}

export default auth;
