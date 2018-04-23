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
    this.props.dispatch(actions.showModal('REGISTER', {}));
  }

  showLogin() {
    this.props.dispatch(actions.showModal('LOGIN', {}));
  }

  render() {
    return (
      <header className="header">
        <Logo />
        <UserMenu
          isAuthenticated={this.props.isAuthenticated}
          username={this.props.username}
          name={this.props.name}
          avatar={this.props.avatar}
          logout={() => this.handleLogout()}
          isFetching={this.props.isFetching}
          showRegister={() => this.showRegister()}
          showLogin={() => this.showLogin()}
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

const HeaderContainer = connect(mapStateToProps)(Header);
export default HeaderContainer;
