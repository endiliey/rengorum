import React, { Component } from 'react';
import { Form, Icon, Message, Button } from 'semantic-ui-react';
import './styles.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  isFormValid = () => {
    const {
      username,
      password
    } = this.state;

    let isFormValid = true;
    if (!username || !password) {
      isFormValid = false;
    }
    return isFormValid;
  }

  handleSubmit = (e) => {
    if (this.isFormValid()) {
      this.props.handleLogin(
        this.state.username,
        this.state.password
      );
    }
  }

  render() {
    let {
      isLoading,
      error,
      showRegister
    } = this.props;

    let message = null;
    if (error) {
      message = (
        <div className="login-message">
          <Message attached error icon>
            <Message.Content>
              <Icon name='thumbs down' size='big' />
              {error || "Login Error"}
            </Message.Content>
          </Message>
        </div>
      );
    } else if (isLoading) {
      message = (
        <div className="login-message">
          <Message attached icon>
            <Message.Content>
              <Icon name='circle notched' loading size='big' />
              Loading
            </Message.Content>
          </Message>
        </div>
      );
    }

    return (
      <div>
        <Message
          attached
          header='Login'
        />
        {message}
        <Form className='attached fluid segment'>
          <Form.Input required
            label='Username'
            placeholder='Username'
            type='text'
            name='username'
            value={ this.state.username }
            onChange={ this.handleChange }
          />
          <Form.Input required
            label='Password'
            type='password'
            name='password'
            value={ this.state.password }
            onChange={ this.handleChange }
          />
          <Button
            color='blue'
            loading={isLoading}
            disabled={isLoading}
            onClick={ this.handleSubmit }>Submit
          </Button>
        </Form>
        <Message attached='bottom' warning>
          <Icon name='help' />
          New to this site?&nbsp;
          <a className='login-register'
            onClick={showRegister}
          >
            Register here
          </a>
            &nbsp;instead.
        </Message>
      </div>
    );
  }
}
