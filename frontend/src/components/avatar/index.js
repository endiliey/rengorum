import React from 'react';
import {Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import './styles.css';

const Avatar = props => {
  let {className, avatar, centered, link} = props;

  avatar = avatar || 'https://i.imgur.com/7o5cwt8.png';
  // Convert http to https
  if (/^http/.test(avatar) && !/^https/.test(avatar)) {
    avatar = avatar.replace(/^http/, 'https');
  }
  centered = centered !== null ? centered : true;
  className = className || 'avatar';
  const avatarComponent = (
    <Image className={className} src={avatar} centered={centered} />
  );
  if (link) {
    return <Link to={link}>{avatarComponent}</Link>;
  }
  return avatarComponent;
};

export default Avatar;
