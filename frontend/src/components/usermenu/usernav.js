import React, {Component} from 'react';
import {withRouter} from 'react-router';
import Avatar from '../avatar';
import {Menu, Dropdown} from 'semantic-ui-react';
import './styles.css';

class UserNav extends Component {
  render() {
    const {
      username,
      avatar,
      logout,
      showEditProfile,
      history,
      name,
    } = this.props;

    const myProfile = () => {
      history.push(`/user/${username}`);
    };

    return (
      <div className="userMenu">
        <Menu fluid inverted borderless size="large" className="userMenu-menu">
          <Menu.Item disabled className="userMenu-avatar">
            <Avatar avatar={avatar} />
          </Menu.Item>
          <Dropdown item simple text={name || username} direction="left">
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={myProfile}
                icon="user"
                text="My profile"
              />
              <Dropdown.Item
                onClick={showEditProfile}
                icon="setting"
                text="Edit profile"
              />
              <Dropdown.Item onClick={logout} icon="sign out" text="Logout" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu>
      </div>
    );
  }
}

export default withRouter(UserNav);
