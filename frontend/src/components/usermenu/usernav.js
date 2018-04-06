import React, { Component } from 'react';
import Avatar from '../avatar';
import Button from '../button';
import './styles.css';

class UserNav extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const test_username = "kang_han_na";
    return (
        <div className="userMenu">
          <Button className="dropProfile" type="button">
            <Avatar
              className="userAvatar"
              avatar={this.props.avatar}
            />
            <p className="username">{this.props.username || test_username}</p>
          </Button>
          <div className="userMenu-content">
            <a href="https://www.quora.com/">My profile</a>
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
