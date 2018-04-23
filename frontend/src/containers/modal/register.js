import React, { Component } from 'react';
import { connect } from 'react-redux';
import Register from '../../components/register';
import Modal from '../../components/modal';
import { hideModal, register } from '../../actions';
//import { hideModal, register } from '../../actions'; TODO

class RegisterModal extends Component {
  handleClose() {
    this.props.dispatch(hideModal());
  }

  render() {
    const handleRegister = (username, name, email, password) => {
      this.props.dispatch(register(username, name, email, password));
    }

    if (this.props.isAuthenticated) {
      this.handleClose();
      return null;
    }
    return (
      <Modal
        title="Register"
        onClose={() => this.handleClose()}
      >
        <Register
          handleRegister={handleRegister}
          loading={this.props.isFetching}
          error={this.props.error}
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

export default connect(mapStateToProps)(RegisterModal);
