import store from '../store';
export const API_URL = "http://localhost:8000/api/";
export const LOGIN_URL = "users/login/";
export const LOGOUT_URL= "users/logout/";
export const REGISTER_URL = "users/register/";
export const USER_PROFILE_URL = "users/";

export const getHeader = () => {
  const isAuthenticated = store.getState().auth.isAuthenticated;
  if (isAuthenticated) {
    const token = store.getState().auth.token;
    const config = {
      headers: {'Authorization': 'Token ' + token}
    };
    return config;
  }
  return null;
}
