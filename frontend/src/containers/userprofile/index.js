import React, { Component } from 'react';
import { connect } from 'react-redux';
import NotFoundPage from '../../components/not-found-page';
import {
  fetchUserProfile
} from '../../actions';
import Loader from '../../components/loader';
import Avatar from '../../components/avatar';
import './styles.css';

class UserProfile extends Component {
  componentDidMount() {
    console.log("mount leh");
    console.log(this.props.params);
    const { username } = this.props.match.params; // from react-router
    this.props.fetchUserProfile(username);
  }

  componentWillReceiveProps(newProps) {
    // fetch profile if different username
    const { username: oldUsername } = this.props.match.params;
    const { username: futureUsername } = newProps.match.params;
    if (oldUsername !== futureUsername) {
      this.props.fetchUserProfile(futureUsername);
    }
  }

  renderLoading() {
    return (
      <div className="userProfile-loading">
        <Loader />
        <br /><br />
        Loading user profile ...
      </div>
    );
  }

  renderError() {
    if (this.props.error.includes("Not Found")) {
      return (
        <NotFoundPage />
      );
    }
    return (
      <div className="userProfile-error">
        {this.props.error}
      </div>
    );
  }

  renderProfile() {
    const {
      username,
      avatar
    } = this.props.profile;

    return (
      <Avatar
        username={username}
        avatar={avatar}
      />
    );
  }

  render() {
    if (this.props.isFetching) {
      return this.renderLoading();
    } else if (this.props.error) {
      return this.renderError();
    } else if (!this.props.profile) {
      return <NotFoundPage />;
    }
    return this.renderProfile();
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.userProfile.isFetching,
  profile: state.userProfile.profile,
  error: state.userProfile.error
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserProfile: (username) => {
    dispatch(fetchUserProfile(username));
  }
});

const UserProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);

export default UserProfileContainer;
