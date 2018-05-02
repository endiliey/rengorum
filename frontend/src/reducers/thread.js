import {
  FETCH_THREAD_REQUEST,
  FETCH_THREAD_SUCCESS,
  FETCH_THREAD_FAILURE
} from '../actions/types';

const initialState = {
  isLoading: false,
  thread: null,
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
        thread: action.thread,
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
