import {
  FETCH_FORUM_REQUEST,
  FETCH_FORUM_SUCCESS,
  FETCH_FORUM_FAILURE
} from '../actions/types';

const initialState = {
  isLoading: false,
  name: null,
  slug: null,
  description: null,
  threads: null,
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
        name: action.name,
        slug: action.slug,
        description: action.description,
        threads: action.threads,
        error: null
      };
    case FETCH_FORUM_FAILURE:
      return {
        isLoading: false,
        name: null,
        slug: null,
        description: null,
        threads: null,
        error: action.error
      };
    default:
      return state;
  }
};

export default forum;
