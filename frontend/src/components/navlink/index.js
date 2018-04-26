import React from 'react';
import Logo from '../logo';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './styles.css';

const Navlink = () => {
  return (
    <div className='navlinkContainer'>
      <Logo />
      <div>
        <Icon name="home" className="navlinkIcon" />
        <Link to="/">Home</Link>
      </div>
      <div>
        <Icon name="users" className="navlinkIcon" />
        <Link to="/users">Users</Link>
      </div>
      <div>
        <Icon name="spy" className="navlinkIcon" />
        <Link to="/user/endiliey">Creator</Link>
      </div>
      <div>
        <Icon name="github" className="navlinkIcon" />
        <a href="https://github.com/endiliey/rengorum">Github</a>
      </div>
    </div>
  );
};

export default Navlink;
