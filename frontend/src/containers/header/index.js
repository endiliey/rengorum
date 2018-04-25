import React, { Component } from 'react';
import { connect } from 'react-redux';
import Logo from '../../components/logo';
import UserMenu from '../../components/usermenu';
import './styles.css';
import {
  showModal
} from '../../actions';
import {
  logout
} from '../../api';

class Header extends Component {
  render() {
    const {
      isAuthenticated,
      username,
      name,
      avatar,
      handleLogout,
      isFetching,
      showRegister,
      showLogin
    } = this.props;
    
    return (
      <header className="header">
        <Logo />
        <UserMenu
          isAuthenticated={isAuthenticated}
          username={username}
          name={name}
          avatar={avatar}
          logout={handleLogout}
          isFetching={isFetching}
          showRegister={showRegister}
          showLogin={showLogin}
        />
      </header>
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.username,
  name: state.auth.name,
  avatar: state.auth.avatar,
  isAuthenticated: state.auth.isAuthenticated,
  isFetching: state.auth.isFetching
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
  }
});

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
export default HeaderContainer;
