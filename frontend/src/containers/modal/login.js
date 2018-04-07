import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from '../../components/login';
import Modal from '../../components/modal';
import { hideModal, login } from '../../actions';

class LoginModal extends Component {
  handleClose() {
    this.props.dispatch(hideModal());
  }

  handleLogin(username, password) {
    this.props.dispatch(login(username, password));
  }

  render() {
    if (this.props.isAuthenticated) {
      this.handleClose();
      return null;
    }
    return (
      <Modal
        title="Login"
        onClose={() => this.handleClose()}
      >
        <Login
          handleLogin={(username, password) => this.handleLogin(username, password)}
          loading={this.props.isFetching}
          error={this.props.error}
        />
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.auth.isFetching,
  error: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(LoginModal);
