import React, { Component } from 'react';
import { Form, Icon, Message, Button } from 'semantic-ui-react';
import './styles.css';

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    const {
      name,
      avatar
    } = this.props;

    this.state = {
      name: name ? name : '',
      password: '',
      bio: '',
      avatar: avatar ? avatar : '',
      status: ''
    };
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    let newProfile = {
      name: this.state.name,
      password: this.state.password,
      bio: this.state.bio,
      avatar: this.state.avatar,
      status: this.state.status
    };
    this.props.handleEdit(newProfile);
  }

  render() {
    let {
      isLoading,
      error,
      avatar,
      name,
      handleEdit,
      success
    } = this.props;

    let message = null;
    if (error) {
      message = (
        <div className="editProfile-message">
          <Message attached error icon>
            <Message.Content>
              <Icon name='thumbs down' size='big' />
              {error || "Unknown Error"}
            </Message.Content>
          </Message>
        </div>
      );
    } else if (isLoading) {
      message = (
        <div className="editProfile-message">
          <Message attached icon>
            <Message.Content>
              <Icon name='circle notched' loading size='big' />
              Loading
            </Message.Content>
          </Message>
        </div>
      );
    } else if (success) {
      message = (
        <div className="editProfile-message">
          <Message attached positive icon>
            <Message.Content>
              <Icon name='thumbs up' size='big' />
              Your profile edit was successful
            </Message.Content>
          </Message>
        </div>
      );
    }

    return (
      <div>
        <Message
          attached
          header='Edit Your Profile'
          content='Fill out any part of the form below to edit your profile'
        />
        {message}
        <Form
          className='attached fluid segment'
        >
          <Form.Input
            label='Name'
            placeholder='Name'
            type='text'
            name='name'
            value={ this.state.name}
            onChange={ this.handleChange }
          />
          <Form.Input
            label='Password'
            type='password'
            name='password'
            value={ this.state.password }
            onChange={ this.handleChange }
          />
          <Form.Input
            label='Bio'
            placeholder='Bio'
            type='text'
            name='bio'
            value={ this.state.bio}
            onChange={ this.handleChange }
          />
          <Form.Input
            label='Avatar'
            placeholder='Avatar'
            type='url'
            name='avatar'
            value={ this.state.avatar}
            onChange={ this.handleChange }
          />
          <Form.Input
            label='Status'
            placeholder='Status'
            type='text'
            name='status'
            value={ this.state.status}
            onChange={ this.handleChange }
          />
          <Button
            color='blue'
            loading={isLoading}
            disabled={isLoading}
            onClick={ this.handleSubmit }>Submit
          </Button>
        </Form>
      </div>
    );
  }
}
