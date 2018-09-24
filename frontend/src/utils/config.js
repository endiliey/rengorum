import store from '../store';

export const getConfig = () => {
  const isAuthenticated = store.getState().auth.isAuthenticated;
  if (isAuthenticated) {
    const token = store.getState().auth.token;
    const config = {
      headers: {Authorization: 'Token ' + token},
    };
    return config;
  }
  return null;
};
