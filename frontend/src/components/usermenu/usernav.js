import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../avatar';
import Button from '../button';
import './styles.css';

class UserNav extends Component {
  render() {
    const username = this.props.username || "TestUser";
    const avatar = this.props.avatar || "http://api.adorable.io/avatar/200/TestUser";
    return (
        <div className="userMenu">
          <Button className="dropProfile" type="button">
            <Avatar
              className="userAvatar"
              avatar={avatar}
            />
            <p className="username">{username}</p>
          </Button>
          <div className="userMenu-content">
            <Link to={`/user/${username}`}>My profile</Link>
            <Button
              className="btn-logout"
              onClick={this.props.logout}
              loading={this.props.isFetching}
            >
              Logout
            </Button>
          </div>
        </div>
    );
  }
}

export default UserNav;
