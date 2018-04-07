import React, { Component } from 'react';
import { connect } from 'react-redux';
import Register from '../../components/register';
import Modal from '../../components/modal';
import { hideModal } from '../../actions';
//import { hideModal, register } from '../../actions'; TODO

class RegisterModal extends Component {
  handleClose() {
    this.props.dispatch(hideModal());
  }

  handleRegister() {
    // // TODO: dispatch the registration params
  }

  render() {
    if (this.props.isAuthenticated) {
      this.handleClose();
      return null;
    }
    return (
      <Modal
        title="Register"
        onClose={() => this.handleClose()}
      >
        <Register />
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  // TODO
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(RegisterModal);
