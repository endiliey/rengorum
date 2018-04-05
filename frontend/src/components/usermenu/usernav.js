import React, { Component } from 'react';
import Avatar from '../avatar';
import './styles.css'

export default class UserNav extends Component {
  render() {
    return (
      <div className="userMenu">
        <Avatar
          className="userAvatar"
          avatar={'https://www.wowkeren.com/images/photo/kang_han_na.jpg'}
        />
      </div>
    );
  }
}
