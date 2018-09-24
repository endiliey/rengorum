import {
  FETCH_USER_PROFILE_REQUEST,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILURE,
} from '../actions/types';

const initialState = {
  isLoading: false,
  profile: null,
  error: null,
};

const userProfile = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_USER_PROFILE_SUCCESS:
      return {
        isLoading: false,
        profile: action.profile,
        error: null,
      };
    case FETCH_USER_PROFILE_FAILURE:
      return {
        ...initialState,
        error: action.error,
      };
    default:
      return state;
  }
};

export default userProfile;
