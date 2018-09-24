import React, {Component} from 'react';
import {connect} from 'react-redux';
import Navlink from '../../components/navlink';
import UserMenu from '../../components/usermenu';
import './styles.css';
import {showModal, logout} from '../../actions';

class HeaderContainer extends Component {
  render() {
    const {
      isAuthenticated,
      username,
      name,
      avatar,
      handleLogout,
      isLoading,
      showRegister,
      showLogin,
      showEditProfile,
    } = this.props;

    return (
      <div className="headerContainer">
        <Navlink />
        <UserMenu
          isAuthenticated={isAuthenticated}
          username={username}
          name={name}
          avatar={avatar}
          logout={handleLogout}
          isLoading={isLoading}
          showRegister={showRegister}
          showLogin={showLogin}
          showEditProfile={showEditProfile}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.username,
  name: state.auth.name,
  avatar: state.auth.avatar,
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
});

const mapDispatchToProps = dispatch => ({
  handleLogout: () => {
    dispatch(logout());
  },
  showRegister: () => {
    dispatch(showModal('REGISTER', {}));
  },
  showLogin: () => {
    dispatch(showModal('LOGIN', {}));
  },
  showEditProfile: () => {
    dispatch(showModal('EDIT_PROFILE', {}));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderContainer);
