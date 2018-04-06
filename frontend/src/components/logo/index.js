import React from 'react';
import logo from './logo.svg';
import { Link } from 'react-router-dom';
import './styles.css';

const Logo = () => {
  return (
    <div className='logoContainer'>
      <img src={logo} className="logo" alt="logo" />
      <div className='logoTitle'>
        <Link to="/">Rengorum</Link>
      </div>
    </div>
  );
};

export default Logo;
