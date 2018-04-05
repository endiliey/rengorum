import React, { Component } from 'react';
import Button from '../button';
import './styles.css'

export default class GuestNav extends Component {
  render() {
    return (
      <div className="guestMenu">
        <Button
          className="btn-sign-in"
          type="button"
        >
          Sign in
        </Button>
        <br />
        <Button
          className="btn-register"
          type="button"
        >
          Register
        </Button>
      </div>
    );
  }
}
