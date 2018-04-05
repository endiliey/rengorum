import React from 'react';
import './styles.css';

const Avatar = (props) => {
  const default_avatar = 'https://www.wowkeren.com/images/photo/kang_han_na.jpg';

  return (
    <img
      alt=''
      className={props.className || 'avatar'}
      src={props.avatar || default_avatar}
    />
  );
}

export default Avatar;
