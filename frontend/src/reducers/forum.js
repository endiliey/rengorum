import {
  FETCH_FORUM_REQUEST,
  FETCH_FORUM_SUCCESS,
  FETCH_FORUM_FAILURE,
  CREATE_THREAD_REQUEST,
  CREATE_THREAD_SUCCESS,
  CREATE_THREAD_FAILURE,
  CREATE_THREAD_SAVE,
  CREATE_THREAD_TOGGLE,
  LOGOUT,
} from '../actions/types';

const forumInitialState = {
  isLoading: false,
  name: null,
  slug: null,
  description: null,
  threads: null,
  error: null,
};

const newThreadInitialState = {
  newThreadLoading: false,
  newThreadSuccess: false,
  newThreadName: '',
  newThreadContent: '',
  newThreadId: null,
  newThreadError: null,
  newThreadShow: false,
};

const initialState = {
  ...forumInitialState,
  ...newThreadInitialState,
};

const forum = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FORUM_REQUEST:
      return {
        ...forumInitialState,
        ...state,
        newThreadLoading: false,
        newThreadSuccess: false,
        newThreadId: null,
        newThreadError: null,
        newThreadShow: false,
        isLoading: true,
        error: null,
      };
    case FETCH_FORUM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        name: action.name,
        slug: action.slug,
        description: action.description,
        threads: action.threads,
        error: null,
      };
    case FETCH_FORUM_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case CREATE_THREAD_REQUEST:
      return {
        ...state,
        newThreadLoading: true,
        newThreadSuccess: false,
        newThreadError: null,
        newThreadName: action.newThread.name,
        newThreadContent: action.newThread.content,
      };
    case CREATE_THREAD_SUCCESS:
      return {
        ...state,
        newThreadLoading: false,
        newThreadSuccess: true,
        newThreadName: '',
        newThreadContent: '',
        newThreadId: action.newThread.id,
        newThreadShow: false,
        newThreadError: null,
      };
    case CREATE_THREAD_FAILURE:
      return {
        ...state,
        newThreadLoading: false,
        newThreadSuccess: false,
        newThreadId: null,
        newThreadShow: true,
        newThreadError: action.error,
      };
    case CREATE_THREAD_SAVE:
      return {
        ...state,
        newThreadName: action.name,
        newThreadContent: action.content,
      };
    case CREATE_THREAD_TOGGLE:
      return {
        ...state,
        newThreadShow: !state.newThreadShow,
        newThreadSuccess: false,
        newThreadError: null,
      };
    case LOGOUT:
      return {
        ...state,
        ...newThreadInitialState,
      };
    default:
      return state;
  }
};

export default forum;
