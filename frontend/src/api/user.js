import axios from 'axios';
import store from '../store';
import {
  USER_LOGIN_URL,
  USER_LOGOUT_URL,
  USER_REGISTER_URL,
  USER_EDIT_URL,
  USER_URL
} from './constants';
import { apiErrorHandler } from '../utils/errorhandler';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutAction,
  registerRequest,
  registerSuccess,
  registerFailure,
  fetchUserProfileRequest,
  fetchUserProfileSuccess,
  fetchUserProfileFailure,
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  editProfileRequest,
  editProfileSuccess,
  editProfileFailure,
  hideModal
} from '../actions';

export const getConfig = () => {
  const isAuthenticated = store.getState().auth.isAuthenticated;
  if (isAuthenticated) {
    const token = store.getState().auth.token;
    const config = {
      headers: {Authorization: 'Token ' + token}
    };
    return config;
  }
  return null;
}

export const login = (username, password) => (dispatch) => {
  dispatch(loginRequest());

  axios.post(USER_LOGIN_URL, {
    username,
    password
  }, getConfig())
  .then(response => {
    dispatch(loginSuccess(response.data));
    dispatch(hideModal());
  })
  .catch(error => {
    const errorMessage = apiErrorHandler(error);
    dispatch(loginFailure(errorMessage));
  });
};

export const logout = () => dispatch => {
    // api call to delete token server-side
    axios.post(USER_LOGOUT_URL, null, getConfig());

    dispatch(logoutAction());
};

export const register = (username, name, email, password) => (dispatch) => {
  dispatch(registerRequest());

  axios.post(USER_REGISTER_URL, {
    username,
    name,
    email,
    password
  }, getConfig())
  .then(response => {
    dispatch(registerSuccess());
    dispatch(login(username, password));
  })
  .catch(error => {
    const errorMessage = apiErrorHandler(error);
    dispatch(registerFailure(errorMessage));
  });
};

export const fetchUserProfile = username => dispatch => {
  dispatch(fetchUserProfileRequest());

  axios.get(USER_URL + username, getConfig())
  .then(response => {
    dispatch(fetchUserProfileSuccess(response.data));
  })
  .catch(error => {
    const errorMessage = apiErrorHandler(error);
    dispatch(fetchUserProfileFailure(errorMessage));
  });
};

export const editProfile = newProfile => dispatch => {
  dispatch(editProfileRequest());

  const username = store.getState().auth.username;
  if (!username) {
    dispatch(editProfileFailure('Not authenticated'));
  } else {
    axios.put(USER_URL + username + USER_EDIT_URL, newProfile, getConfig())
    .then(response => {
      dispatch(editProfileSuccess(newProfile));
    })
    .catch(error => {
      const errorMessage = apiErrorHandler(error);
      dispatch(editProfileFailure(errorMessage));
    });
  }
};

export const fetchUsers = () => dispatch => {
  dispatch(fetchUsersRequest());

  axios.get(USER_URL, getConfig())
  .then(response => {
    dispatch(fetchUsersSuccess(response.data));
  })
  .catch(error => {
    const errorMessage = apiErrorHandler(error);
    dispatch(fetchUsersFailure(errorMessage));
  });
};
