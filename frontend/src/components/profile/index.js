import React, {Component} from 'react';
import Avatar from '../avatar';
import './styles.css';

class Profile extends Component {
  formatDateTime(datetime) {
    return datetime.split('.')[0].replace('T', ' ');
  }

  render() {
    const {
      name,
      username,
      avatar,
      bio,
      status,
      isStaff,
      dateJoined,
    } = this.props;

    return (
      <div className="profileContainer">
        <div>
          <Avatar className="profileAvatar" avatar={avatar} centered={false} />
        </div>
        <div className="profileInfo">
          <div className="name">{name}</div>
          <div className="username">
            <strong>@{username}</strong>
            <b className="staffStatus">{isStaff ? ' (Staff) ' : ''}</b>
          </div>
          <div className="status">
            <strong>Status: </strong>
            {status}
          </div>
          <div className="dateJoined">
            <strong>Joined: </strong>
            {dateJoined}
          </div>
          <div className="bio">
            <strong>Bio: </strong>
            {bio}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
