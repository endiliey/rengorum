import React, { Component } from 'react';
import { connect } from 'react-redux';
import Logo from '../../components/logo';
import UserMenu from '../../components/usermenu';
import './styles.css';
import * as actions from '../../actions';

class Header extends Component {
  handleLogout() {
    this.props.dispatch(actions.logout());
  }

  showRegister() {
    this.props.dispatch(actions.showModal('Register', {}));
  }

  render() {
    return (
      <header className="header">
        <Logo />
        <UserMenu
          isAuthenticated={this.props.isAuthenticated}
          username={this.props.username}
          avatar={this.props.avatar}
          logout={() => this.handleLogout()}
          isFetching={this.props.isFetching}
        />
        <button onClick={() => this.showRegister()}>
          Show register
        </button>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.username,
  avatar: state.auth.avatar,
  isAuthenticated: state.auth.isAuthenticated,
  isFetching: state.auth.isFetching
});

const HeaderContainer = connect(mapStateToProps)(Header);
export default HeaderContainer;
