import React, {Component} from 'react';
import GuestNav from './guestnav';
import UserNav from './usernav';

class UserMenu extends Component {
  render() {
    const {
      isAuthenticated,
      username,
      name,
      avatar,
      logout,
      isLoading,
      showRegister,
      showLogin,
      showEditProfile,
    } = this.props;

    if (isAuthenticated) {
      return (
        <UserNav
          username={username}
          name={name}
          avatar={avatar}
          logout={logout}
          showEditProfile={showEditProfile}
          isLoading={isLoading}
        />
      );
    } else {
      return <GuestNav showRegister={showRegister} showLogin={showLogin} />;
    }
  }
}

export default UserMenu;
