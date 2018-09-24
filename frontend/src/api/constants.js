export const API_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;
export const USER_URL = API_URL + 'user/';
export const USER_REGISTER_URL = USER_URL + 'register/';
export const USER_LOGIN_URL = USER_URL + 'login/';
export const USER_LOGOUT_URL = USER_URL + 'logout/';
export const USER_EDIT_URL = '/edit/';
export const USER_DELETE_URL = '/delete/';
export const FORUM_URL = API_URL + 'forum/';
export const FORUM_CREATE_URL = FORUM_URL + 'create/';
export const FORUM_EDIT_URL = '/edit/';
export const FORUM_DELETE_URL = '/delete/';
export const THREAD_URL = API_URL + 'thread/';
export const THREAD_CREATE_URL = THREAD_URL + 'create/';
export const THREAD_EDIT_URL = '/edit/';
export const THREAD_DELETE_URL = '/delete/';
export const POST_URL = API_URL + 'post/';
export const POST_CREATE_URL = POST_URL + 'create/';
export const POST_EDIT_URL = '/edit/';
export const POST_DELETE_URL = '/delete/';
