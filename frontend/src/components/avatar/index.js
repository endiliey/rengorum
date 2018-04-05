import React from 'react';
import './styles.css';

const Avatar = (props) => {
  const default_avatar = 'https://i.stack.imgur.com/SE2cv.jpg'

  return (
    <img
      alt=''
      className={props.className || 'avatar'}
      src={props.avatar || default_avatar}
    />
  );
}

export default Avatar;
