import {
  FETCH_FORUM_REQUEST,
  FETCH_FORUM_SUCCESS,
  FETCH_FORUM_FAILURE
} from '../actions/types';

const initialState = {
  isLoading: false,
  forum: null,
  error: null
};

const forum = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_FORUM_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_FORUM_SUCCESS:
      return {
        isLoading: false,
        forum: action.forum,
        error: null
      };
    case FETCH_FORUM_FAILURE:
      return {
        isLoading: false,
        forum: null,
        error: action.error
      };
    default:
      return state;
  }
};

export default forum;
