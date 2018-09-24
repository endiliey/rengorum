import React from 'react';
import logo from './logo.svg';
import './styles.css';

const Logo = () => {
  return (
    <div className="logoContainer">
      <img src={logo} className="logo" alt="logo" />
      <div className="logoTitle">Rengorum</div>
    </div>
  );
};

export default Logo;
