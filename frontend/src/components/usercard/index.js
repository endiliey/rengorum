import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class UserCard extends Component {
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
            <b style={{color: 'red', fontSize: '12px'}}>
              {isStaff ? ' (Staff) ' : ''}
            </b>
          </Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}

export default UserCard;
