import {
  FETCH_THREAD_REQUEST,
  FETCH_THREAD_SUCCESS,
  FETCH_THREAD_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE
} from '../actions/types';

const threadInitialState = {
  isLoading: false,
  name: null,
  content: null,
  pinned: false,
  creator: null,
  createdt: null,
  posts: [],
  error: null
};

const newPostInitialState = {
  newPostSuccess: false,
  newPostLoading: false,
  newPostError: null
};

const initialState = {
  ...threadInitialState,
  ...newPostInitialState
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
        ...state,
        ...newPostInitialState,
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
    case CREATE_POST_REQUEST:
      return {
        ...state,
        newPostLoading: true,
        newPostError: null,
        newPostSuccess: false
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        newPostLoading: false,
        newPostError: null,
        newPostSuccess: true
      };
    case CREATE_POST_FAILURE:
      return {
        ...state,
        newPostLoading: false,
        newPostError: action.error,
        newPostSuccess: false
      };
    default:
      return state;
  }
};

export default thread;
