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
        <div className="dropdownMenu">
          <Avatar
            className="userAvatar"
            avatar={this.props.avatar}
          />
          <p class="username">{this.props.username || test_username}</p>
        </div>
      </div>
    );
  }
}

export default UserNav;
