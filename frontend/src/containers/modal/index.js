import React from 'react';
import { connect } from 'react-redux';
import Register from '../../components/register';
import Modal from '../../components/modal';
import { hideModal } from '../../actions';

const ModalContainer = (props) => {

  const closeModal = () => {
    props.dispatch(hideModal());
  }

  switch (props.modalType) {
    case 'Register':
      return (
        <Modal title="Register" onClose={closeModal}> <Register /> </Modal>);
    default:
      return null;
  }
};

const mapStateToProps = state => ({
  modalType: state.modal.modalType,
  modalProps: state.modal.modalProps
});

export default connect(mapStateToProps)(ModalContainer);
