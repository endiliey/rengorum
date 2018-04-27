import React, { Component } from 'react';
import { connect } from 'react-redux';
import Register from '../../components/register';
import Modal from '../../components/modal';
import {
  hideModal,
  registerReset
} from '../../actions';
import {
  register
} from '../../api';

class RegisterModal extends Component {
  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.handleClose();
    }
  }

  render() {
    const {
      isAuthenticated,
      isLoading,
      error,
      handleRegister,
      handleClose
    } = this.props;

    return isAuthenticated ? null : (
      <Modal
        onClose={handleClose}
      >
        <Register
          handleRegister={handleRegister}
          isLoading={isLoading}
          error={error}
        />
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.register.error,
  isLoading: state.register.isLoading
});

const mapDispatchToProps = (dispatch) => ({
  handleRegister: (username, name, email, password) => {
    dispatch(register(username, name, email, password));
  },
  handleClose: () => {
    dispatch(hideModal());
    dispatch(registerReset());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterModal);
