import {
  FETCH_HOME_REQUEST,
  FETCH_HOME_SUCCESS,
  FETCH_HOME_FAILURE,
} from '../actions/types';

const initialState = {
  isLoading: false,
  forums: null,
  error: null,
};

const home = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOME_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_HOME_SUCCESS:
      return {
        isLoading: false,
        forums: action.forums,
        error: null,
      };
    case FETCH_HOME_FAILURE:
      return {
        ...initialState,
        error: action.error,
      };
    default:
      return state;
  }
};

export default home;
