import React, { Component } from 'react';
import Button from '../button';
import './styles.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'endiliey',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleClick() {
    this.props.handleLogin(this.state.username, this.state.password);
  }

  render() {
    return (
      <div className="login-container">
        <form noValidate>
          <div className="error" id="Error">
            {this.props.error}
          </div>
          <div className="form-group">
            <label id="usernameLabel">Username</label>
            <input className="form-control"
              type="email"
              name="username"
              ref="username"
              value={ this.state.username }
              onChange={ this.handleChange }
              required />
          </div>
          <div className="form-group">
            <label id="passwordLabel">Password</label>
            <input className="form-control"
              type="password"
              name="password"
              ref="password"
              value={ this.state.password }
              onChange={ this.handleChange }
              pattern=".{5,}"
              required />
          </div>
          <Button
            loading={this.props.loading}
            onClick={() => this.handleClick()}>Login
          </Button>
        </form>
      </div>
    );
  }
}
