import React, {Component} from 'react';
import Button from '../button';
import './styles.css';

class GuestNav extends Component {
  render() {
    const {showLogin, showRegister} = this.props;
    return (
      <div className="guestMenu">
        <Button className="btn-sign-in" type="button" onClick={showLogin}>
          Login
        </Button>
        <br />
        <Button className="btn-register" type="button" onClick={showRegister}>
          Register
        </Button>
      </div>
    );
  }
}

export default GuestNav;
