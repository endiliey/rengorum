import {SHOW_MODAL, HIDE_MODAL} from '../actions/types';

const initialState = {
  modalType: null,
  modalProps: {},
};

const modal = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        modalType: action.modalType,
        modalProps: action.modalProps,
      };
    case HIDE_MODAL:
      return {
        modalType: null,
        modalProps: {},
      };
    default:
      return state;
  }
};

export default modal;
