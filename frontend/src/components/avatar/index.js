import React from 'react';
import './styles.css';

const Avatar = (props) => {
  const size = props.size || '50px';
  const default_avatar = 'https://i.stack.imgur.com/SE2cv.jpg'

  return (
    <img
      alt=''
      className={props.className || 'userAvatar'}
      src={props.avatar || default_avatar}
      width={size}
      height={size}
    />
  );
}

export default Avatar;
