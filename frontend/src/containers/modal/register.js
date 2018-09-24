import React, {Component} from 'react';
import {connect} from 'react-redux';
import Register from '../../components/register';
import Modal from '../../components/modal';
import {hideModal, registerReset, showModal, register} from '../../actions';

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
      showLogin,
      handleClose,
    } = this.props;

    return isAuthenticated ? null : (
      <Modal onClose={handleClose}>
        <Register
          handleRegister={handleRegister}
          showLogin={showLogin}
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
  isLoading: state.register.isLoading,
});

const mapDispatchToProps = dispatch => ({
  handleRegister: data => {
    dispatch(register(data));
  },
  handleClose: () => {
    dispatch(hideModal());
    dispatch(registerReset());
  },
  showLogin: () => {
    dispatch(showModal('LOGIN', {}));
    dispatch(registerReset());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterModal);
