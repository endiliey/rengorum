import {
  FETCH_USER_PROFILE_REQUEST,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILURE
} from '../actions/types';

const initialState = {
  isFetching: false,
  profile: null,
  error: null
};

const userProfile = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_USER_PROFILE_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        profile: action.profile,
        error: null
      };
    case FETCH_USER_PROFILE_FAILURE:
      return {
        ...state,
        isFetching: false,
        profile: null,
        error: action.error
      };
    default:
      return state;
  }
};

export default userProfile;
