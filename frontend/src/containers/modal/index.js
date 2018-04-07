import React from 'react';
import { connect } from 'react-redux';
import Register from '../../components/register';
import LoginModal from './login';
import Modal from '../../components/modal';
import { hideModal } from '../../actions';

const ModalContainer = (props) => {
  const handleClose = () => {
    props.dispatch(hideModal());
  }

  switch (props.modalType) {
    case 'REGISTER':
      return (
        <Modal title="Register" onClose={handleClose}>
          <Register {...props.modalProps}/>
        </Modal>
      );
    case 'LOGIN':
      return (
        <LoginModal {...props.modalProps}/>
      );
    default:
      return null;
  }
};

const mapStateToProps = state => ({
  modalType: state.modal.modalType,
  modalProps: state.modal.modalProps
});

export default connect(mapStateToProps)(ModalContainer);
