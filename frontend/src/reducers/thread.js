import {
  FETCH_THREAD_REQUEST,
  FETCH_THREAD_SUCCESS,
  FETCH_THREAD_FAILURE
} from '../actions/types';

const initialState = {
  isLoading: false,
  name: null,
  content: null,
  pinned: false,
  creator: null,
  createdt: null,
  posts: [],
  error: null
};

const thread = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_THREAD_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case FETCH_THREAD_SUCCESS:
      return {
        isLoading: false,
        name: action.thread.name,
        content: action.thread.content,
        pinned: action.thread.pinned,
        creator: action.thread.creator,
        createdAt: action.thread.created_at,
        posts: action.thread.posts,
        error: null
      };
    case FETCH_THREAD_FAILURE:
      return {
        ...initialState,
        error: action.error
      };
    default:
      return state;
  }
};

export default thread;
