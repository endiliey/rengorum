import React, { Component } from 'react';
import { connect } from 'react-redux';
import Register from '../../components/register';
import Modal from '../../components/modal';
import {
  hideModal
} from '../../actions';
import {
  register
} from '../../api';

class RegisterModal extends Component {
  componentWillReceiveProps() {
    if (this.props.isAuthenticated) {
      this.props.handleClose();
    }
  }

  render() {
    const {
      isAuthenticated,
      isFetching,
      error,
      handleRegister,
      handleClose
    } = this.props;

    return isAuthenticated ? null : (
      <Modal
        title="Register"
        onClose={handleClose}
      >
        <Register
          handleRegister={handleRegister}
          loading={isFetching}
          error={error}
        />
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.register.error,
  isFetching: state.register.isFetching
});

const mapDispatchToProps = (dispatch) => ({
  handleRegister: (username, name, email, password) => {
    dispatch(register(username, name, email, password));
  },
  handleClose: () => {
    dispatch(hideModal());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterModal);
