import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_RESET,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,
  EDIT_PROFILE_RESET,
  LOGOUT
} from '../actions/types';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  isEditing: false,
  username: null,
  name: null,
  avatar: null,
  token: null,
  isStaff: false,
  error: null,
  editError: null,
  editSuccess: false
};

const auth = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        token: action.token,
        username: action.username,
        avatar: action.avatar,
        name: action.name,
        isStaff: action.isStaff,
        error: null
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: null,
        username: null,
        avatar: null,
        name: null,
        isStaff: false,
        error: action.error
      };
    case EDIT_PROFILE_REQUEST:
      return {
        ...state,
        isEditing: true,
        editError: null,
        editSuccess: false
      };
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        isEditing: false,
        editError: null,
        editSuccess: true,
        avatar: action.avatar || state.avatar,
        name: action.name || state.name
      };
    case EDIT_PROFILE_FAILURE:
      return {
        ...state,
        isEditing: false,
        editError: action.error,
        editSuccess: false
      };
    case EDIT_PROFILE_RESET:
      return {
        ...state,
        isEditing: false,
        editError: null,
        editSuccess: false
      };
    case LOGIN_RESET:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        username: null,
        name: null,
        avatar: null,
        token: null,
        isStaff: false,
        error: null
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default auth;
