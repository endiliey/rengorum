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
        <div class="userMenu">
          <Button className="dropProfile" type="button">
            <Avatar
              className="userAvatar"
              avatar={this.props.avatar}
            />
            <p class="username">{this.props.username || test_username}</p>
          </Button>
          <div class="userMenu-content">
            <a href="https://www.quora.com/">My profile</a>
            <a href="#">Logout</a>
          </div>
        </div>
    );
  }
}

export default UserNav;
