import React, { Component } from 'react';
import './styles.css';

class Profile extends Component {
  formatDateTime(datetime) {
    return datetime.split(".")[0].replace("T", " ");
  }

  render() {
    const {
      name,
      username,
      avatar,
      bio,
      status,
      isStaff,
      dateJoined
    } = this.props;

    return (
      <div className="profileContainer">
        <div className="profileAvatar">
          <img className="avatar" src={avatar} alt={`${name} avatar`} />
        </div>
        <div className="profileInfo">
          <div className="name">{ name }</div>
          <div className="username">
            <strong>@{username}</strong>
            <a className="staffStatus">
              {isStaff ? ' (Staff) ' : ''}
            </a>
          </div>
          <div className="status">
            <strong>Status: </strong>
            { status }
          </div>
          <div className="dateJoined">
            <strong>Date Joined: </strong>
            { this.formatDateTime(dateJoined) }
          </div>
          <div className="bio">
            <strong>Bio: </strong>
            { bio }
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
