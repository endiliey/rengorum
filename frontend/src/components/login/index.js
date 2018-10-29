import React, {Component} from 'react';
import {Form, Icon, Message, Button} from 'semantic-ui-react';
import StatusMessage from '../../components/statusmessage';
import './styles.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange = (e, {name, value}) => {
    this.setState({[name]: value});
  };

  isFormValid = () => {
    const {username, password} = this.state;

    let isFormValid = true;
    if (!username || !password) {
      isFormValid = false;
    }
    return isFormValid;
  };

  handleSubmit = e => {
    if (this.isFormValid()) {
      this.props.handleLogin(this.state.username, this.state.password);
    }
  };

  render() {
    let {isLoading, error, showRegister} = this.props;

    const statusMessage = (
      <StatusMessage
        error={error}
        errorMessage={error || 'Login Error'}
        loading={isLoading}
        loadingMessage={'Signing in'}
        type="modal"
      />
    );

    return (
      <div>
        <Message attached header="Login" />
        {statusMessage}
        <Form className="attached fluid segment">
          <Form.Input
            required
            label="Username"
            placeholder="Username"
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <Form.Input
            required
            label="Password"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <Button
            color="blue"
            loading={isLoading}
            disabled={isLoading}
            onClick={this.handleSubmit}>
            Login
          </Button>
        </Form>
        <Message attached="bottom" warning>
          <Icon name="help" />
          New to this site?&nbsp;
          {/* eslint-disable-next-line */}
          <a className="login-register" onClick={showRegister}>
            Register here
          </a>
          &nbsp;instead.
        </Message>
      </div>
    );
  }
}
