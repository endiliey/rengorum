import React, { Component } from 'react';
import Button from '../button';
import './styles.css'

class GuestNav extends Component {
  render() {
    return (
      <div className="guestMenu">
        <Button
          className="btn-sign-in"
          type="button"
          onClick={this.props.showLogin}
        >
          Login
        </Button>
        <br />
        <Button
          className="btn-register"
          type="button"
          onClick={this.props.showRegister}
        >
          Register
        </Button>
      </div>
    );
  }
}

export default GuestNav;
