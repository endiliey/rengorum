import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class UserCard extends Component {
  formatDateTime(datetime) {
    return datetime.split(".")[0].replace("T", " ");
  }

  render() {
    const {
      name,
      username,
      isStaff,
      avatar
    } = this.props;

    return (
      <Card>
        <Image src={avatar} />
        <Card.Content>
          <Card.Header>
            {name}
          </Card.Header>
          <Card.Meta>
            <Link to={`/user/${username}`}>@{username}</Link>
            <a style={{color: 'red', fontSize: '12px'}}>
              {isStaff ? ' (Staff) ' : ''}
            </a>
          </Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}

export default UserCard;
