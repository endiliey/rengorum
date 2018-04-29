import React from 'react';
import { Image } from 'semantic-ui-react';
import './styles.css';

const Avatar = (props) => {
  const defaultAvatar = 'https://i.imgur.com/7o5cwt8.png';
  return (
    <Image
      className={props.className || 'avatar'}
      src={props.avatar || defaultAvatar}
      centered={props.centered || true}
    />
  );
}

export default Avatar;
