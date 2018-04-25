import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../avatar';
import Button from '../button';
import './styles.css';

class UserNav extends Component {
  render() {
    const {
      username,
      avatar,
      logout,
      isLoading,
      name
    } = this.props;
    return (
        <div className="userMenu">
          <Button className="dropProfile" type="button">
            <Avatar
              className="userAvatar"
              avatar={avatar}
            />
            <p className="displayName">{name || username}</p>
          </Button>
          <div className="userMenu-content">
            <Link to={`/user/${username}`}>My profile</Link>
            <Button
              className="btn-logout"
              onClick={logout}
              loading={isLoading}
            >
              Logout
            </Button>
          </div>
        </div>
    );
  }
}

export default UserNav;
