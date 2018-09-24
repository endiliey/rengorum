import {
  FETCH_THREAD_REQUEST,
  FETCH_THREAD_SUCCESS,
  FETCH_THREAD_FAILURE,
  CREATE_THREAD_REQUEST,
  CREATE_THREAD_SUCCESS,
  CREATE_THREAD_FAILURE,
  CREATE_THREAD_SAVE,
  CREATE_THREAD_TOGGLE,
  DELETE_THREAD_REQUEST,
  DELETE_THREAD_SUCCESS,
  DELETE_THREAD_FAILURE,
} from './types';
import {
  fetchThreadApi,
  createThreadApi,
  fetchForumApi,
  deleteThreadApi,
} from '../api';
import {fetchForumSuccess, fetchForumFailure} from './forum';
import {apiErrorHandler} from '../utils/errorhandler';

export const fetchThread = thread => dispatch => {
  dispatch(fetchThreadRequest());

  fetchThreadApi(thread)
    .then(response => {
      dispatch(fetchThreadSuccess(response.data));
    })
    .catch(error => {
      const errorMessage = apiErrorHandler(error);
      dispatch(fetchThreadFailure(errorMessage));
    });
};

export const fetchThreadRequest = () => {
  return {
    type: FETCH_THREAD_REQUEST,
  };
};

export const fetchThreadSuccess = thread => {
  return {
    type: FETCH_THREAD_SUCCESS,
    thread,
  };
};

export const fetchThreadFailure = error => {
  return {
    type: FETCH_THREAD_FAILURE,
    error,
  };
};

export const createThread = newThread => dispatch => {
  dispatch(createThreadRequest(newThread));

  createThreadApi(newThread)
    .then(response => {
      dispatch(createThreadSuccess(response.data));

      // re-load forum page
      fetchForumApi(newThread.forum)
        .then(response => {
          dispatch(fetchForumSuccess(response.data));
        })
        .catch(error => {
          const errorMessage = apiErrorHandler(error);
          dispatch(fetchForumFailure(errorMessage));
        });
    })
    .catch(error => {
      const errorMessage = apiErrorHandler(error);
      dispatch(createThreadFailure(errorMessage));
    });
};

export const createThreadRequest = newThread => {
  return {
    type: CREATE_THREAD_REQUEST,
    newThread,
  };
};

export const createThreadSuccess = newThread => {
  return {
    type: CREATE_THREAD_SUCCESS,
    newThread,
  };
};

export const createThreadFailure = error => {
  return {
    type: CREATE_THREAD_FAILURE,
    error,
  };
};

export const createThreadSave = newThread => {
  return {
    type: CREATE_THREAD_SAVE,
    name: newThread.name,
    content: newThread.content,
  };
};

export const createThreadToggle = () => {
  return {
    type: CREATE_THREAD_TOGGLE,
  };
};

export const deleteThread = id => dispatch => {
  dispatch(deleteThreadRequest());

  deleteThreadApi(id)
    .then(response => {
      dispatch(deleteThreadSuccess());

      // re-load thread page
      fetchThreadApi(id)
        .then(response => {
          dispatch(fetchThreadSuccess(response.data));
        })
        .catch(error => {
          const errorMessage = apiErrorHandler(error);
          dispatch(fetchThreadFailure(errorMessage));
        });
    })
    .catch(error => {
      const errorMessage = apiErrorHandler(error);
      dispatch(deleteThreadFailure(errorMessage));
    });
};

export const deleteThreadRequest = () => {
  return {
    type: DELETE_THREAD_REQUEST,
  };
};

export const deleteThreadSuccess = () => {
  return {
    type: DELETE_THREAD_SUCCESS,
  };
};

export const deleteThreadFailure = error => {
  return {
    type: DELETE_THREAD_FAILURE,
    error,
  };
};
