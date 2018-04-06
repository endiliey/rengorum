import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Button from '../button';
import './styles.css'

class GuestNav extends Component {
  render() {
    return (
      <div className="guestMenu">
        <Button
          className="btn-sign-in"
          type="button"
          onClick={() => this.props.history.push('/login')}
        >
          Login
        </Button>
        <br />
        <Button
          className="btn-register"
          type="button"
          onClick={() => this.props.history.push('/register')}
        >
          Register
        </Button>
      </div>
    );
  }
}

export default withRouter(GuestNav);
