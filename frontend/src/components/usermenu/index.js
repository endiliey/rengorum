import React, { Component } from 'react';
import GuestNav from './guestnav';
import UserNav from './usernav';

class UserMenu extends Component {
  render() {
    if (this.props.isAuthenticated) {
      return (
        <UserNav
          username={this.props.username}
          name={this.props.name}
          avatar={this.props.avatar}
          logout={this.props.logout}
          isFetching={this.props.isFetching}
        />
      );
    } else {
      return (
        <GuestNav
          showRegister={this.props.showRegister}
          showLogin={this.props.showLogin}
        />
      );
    }
  }
}

export default UserMenu;
