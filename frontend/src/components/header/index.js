import React from 'react';
import Logo from '../logo';
import UserMenu from '../usermenu';
import './styles.css';

const Header = (props) => {
  return (
    <header className="header">
      <Logo />
      <UserMenu />
    </header>
  );
}
export default Header;
