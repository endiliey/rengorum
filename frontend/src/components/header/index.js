import React from 'react';
import Avatar from '../avatar';
import Logo from '../logo';
import './styles.css';

const Header = (props) => {
  return (
    <header className="header">
      <Logo />
      <div className="userMenu">
        <Avatar
          avatar={'https://www.wowkeren.com/images/photo/kang_han_na.jpg'}
        />
        <Avatar
          avatar={'https://y.gtimg.cn/music/photo_new/T001R300x300M000004Bjyj52RTYOj.jpg?max_age=2592000'}
        />
      </div>
    </header>
  );
}
export default Header;
