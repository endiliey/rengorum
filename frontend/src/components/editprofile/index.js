import React, { Component } from 'react';
import {
  Form,
  Icon,
  Image,
  Message,
  Button,
  TextArea,
  Grid,
  Divider
} from 'semantic-ui-react';
import Avatar from '../avatar';
import './styles.css';

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    const {
      name,
      avatar
    } = this.props;

    this.state = {
      name: name,
      newPassword: '',
      currentPassword: '',
      bio: '',
      avatar: avatar,
      avatarFile: undefined,
      status: ''
    };
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    if (this.state.currentPassword != '') {
      let newProfile = {
        name: this.state.name,
        current_password: this.state.currentPassword,
        new_password: this.state.newPassword,
        bio: this.state.bio,
        avatar: this.state.avatar,
        status: this.state.status
      };
      this.props.handleEdit(newProfile);
    }
    // prevent spamming so user have to keep entering password for every edit submission
    this.setState({
      currentPassword: ''
    });
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
        <Form className='attached segment'>
          <Grid celled columns={2}>
            <Grid.Column>
                <Image
                  src={this.state.avatar}
                  size='small'
                  centered
                />
                <Divider hidden/>
                <Form.Input
                  label='Bio'
                  placeholder='Describe yourself'
                  type='text'
                  name='bio'
                  control={TextArea}
                  value={ this.state.bio}
                  onChange={ this.handleChange }
                />
            </Grid.Column>
            <Grid.Column>
              <Form.Input
                label='Name'
                placeholder='Name'
                type='text'
                name='name'
                value={ this.state.name}
                onChange={ this.handleChange }
              />
              <Form.Input
                required
                label='Current Password'
                type='password'
                name='currentPassword'
                value={ this.state.currentPassword }
                onChange={ this.handleChange }
              />
              <Form.Input
                label='New Password'
                type='password'
                name='newPassword'
                value={ this.state.newPassword }
                onChange={ this.handleChange }
              />
              <Form.Input
                label='Status'
                placeholder='Who are you (e.g: Writer)'
                type='text'
                name='status'
                value={ this.state.status}
                onChange={ this.handleChange }
              />
            </Grid.Column>
          </Grid>
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
