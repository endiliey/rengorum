import {
  FETCH_HOME_REQUEST,
  FETCH_HOME_SUCCESS,
  FETCH_HOME_FAILURE
} from '../actions/types';

const initialState = {
  isFetching: false,
  forums: null,
  error: null
};

const home = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_HOME_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_HOME_SUCCESS:
      return {
        ...state,
        isFetching: false,
        forums: action.forums,
        error: null
      };
    case FETCH_HOME_FAILURE:
      return {
        ...state,
        isFetching: false,
        forums: null,
        error: action.error
      };
    default:
      return state;
  }
};

export default home;
