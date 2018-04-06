import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../button';
import './styles.css'

export default class GuestNav extends Component {
  render() {
    return (
      <div className="guestMenu">
        <Button
          className="btn-sign-in"
          type="button"
          disabled={true}
        >
          <Link to="/login">Login</Link>
        </Button>
        <br />
        <Button
          className="btn-register"
          type="button"
          disabled={true}
        >
          <Link to="/register">Register</Link>
        </Button>
      </div>
    );
  }
}
