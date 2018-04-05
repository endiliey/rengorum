import store from '../store';
export const URL = "http://localhost:8000/api/";
export const LOGIN = "users/login/";
export const LOGOUT = "users/logout/";
export const REGISTER = "users/register/";

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
