import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import {Form, Image, Message, Button, TextArea, Grid} from 'semantic-ui-react';
import {imageUploadApi} from '../../api/image';
import StatusMessage from '../../components/statusmessage';
import './styles.css';

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    const {name, avatar} = this.props;

    this.state = {
      name: name,
      newPassword: '',
      currentPassword: '',
      bio: '',
      status: '',
      avatar: avatar,
      avatarFile: null,
      avatarError: null,
      avatarUploading: false,
    };
  }

  handleChange = (e, {name, value}) => {
    this.setState({[name]: value});
  };

  onImageDrop = files => {
    this.setState({
      avatarFile: files[0],
    });
  };

  editProfile = () => {
    let newProfile = {
      name: this.state.name,
      current_password: this.state.currentPassword,
      new_password: this.state.newPassword,
      bio: this.state.bio,
      avatar: this.state.avatar,
      status: this.state.status,
    };
    this.props.handleEdit(newProfile);

    // prevent spamming so user have to keep entering password for every edit submission
    this.setState({
      currentPassword: '',
    });
  };

  handleSubmit = () => {
    const {currentPassword, avatarFile} = this.state;

    if (currentPassword !== '') {
      if (!avatarFile) {
        // no new avatar
        this.editProfile();
      } else {
        this.setState({
          avatarUploading: true,
        });

        imageUploadApi(avatarFile)
          .then(response => {
            this.setState({
              avatar: response.data.secure_url,
              avatarUploading: false,
            });
            this.editProfile();
          })
          .catch(error => {
            console.log(error);
            this.setState({
              avatarError: 'Image Upload Error',
              avatarFile: null,
              avatarUploading: false,
            });
          });
      }
    }
  };

  render() {
    let {isLoading, error, success} = this.props;

    let {
      name,
      newPassword,
      currentPassword,
      bio,
      status,
      avatar,
      avatarFile,
      avatarError,
      avatarUploading,
    } = this.state;

    const statusMessage = (
      <StatusMessage
        error={error || avatarError}
        errorMessage={error || avatarError}
        loading={isLoading || avatarUploading}
        loadingMessage={'Editing your profile'}
        success={success}
        successMessage={'Your profile edit was successful'}
        type="modal"
      />
    );
    const avatarURL = avatarFile ? avatarFile.preview : avatar;

    return (
      <div>
        <Message
          attached
          header="Edit Your Profile"
          content="Fill out any part of the form below to edit your profile"
        />
        {statusMessage}
        <Form className="attached segment">
          <Grid celled columns={2}>
            <Grid.Column>
              <Form.Field>
                <label>Profile picture</label>
                <Dropzone
                  onDrop={this.onImageDrop}
                  multiple={false}
                  accept="image/*">
                  <Image src={avatarURL} className="editProfile-avatar" />
                </Dropzone>
              </Form.Field>
              <Form.Input
                label="Bio"
                placeholder="Describe yourself"
                type="text"
                name="bio"
                control={TextArea}
                value={bio}
                onChange={this.handleChange}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Input
                label="Name"
                placeholder="Name"
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
              />
              <Form.Input
                required
                label="Current Password"
                type="password"
                name="currentPassword"
                value={currentPassword}
                onChange={this.handleChange}
              />
              <Form.Input
                label="New Password"
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={this.handleChange}
              />
              <Form.Input
                label="Status"
                placeholder="Who are you (e.g: Writer)"
                type="text"
                name="status"
                value={status}
                onChange={this.handleChange}
              />
            </Grid.Column>
          </Grid>
          <Button
            color="blue"
            loading={isLoading}
            disabled={isLoading}
            onClick={this.handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
