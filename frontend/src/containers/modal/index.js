import React from 'react';
import { connect } from 'react-redux';
import RegisterModal from './register';
import LoginModal from './login';

const ModalContainer = (props) => {
  switch (props.modalType) {
    case 'REGISTER':
      return (
        <RegisterModal />
      );
    case 'LOGIN':
      return (
        <LoginModal />
      );
    default:
      return null;
  }
};

const mapStateToProps = state => ({
  modalType: state.modal.modalType,
  modalProps: state.modal.modalProps // for future use if need to pass props
});

export default connect(mapStateToProps)(ModalContainer);
