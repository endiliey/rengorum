import React, { Component } from 'react';
import { connect } from 'react-redux';
import NotFoundPage from '../../components/notfoundpage';
import {
  fetchUserProfile
} from '../../api';
import Loader from '../../components/loader';
import Profile from '../../components/profile';
import './styles.css';

class UserProfile extends Component {
  componentDidMount() {
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
        <br /><br />
        <img
          alt=""
          src="https://78.media.tumblr.com/79a05ebf968c9e3c8aabb431e0e4902f/tumblr_ozkehweZjO1tsqtheo2_r1_500.gif"
        />
      </div>
    );
  }

  renderError() {
    if (this.props.error.includes("Not found")) {
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
      name,
      username,
      status,
      bio,
      avatar,
      date_joined
    } = this.props.profile;

    return (
      <Profile
        username={username}
        name={name}
        avatar={avatar}
        status={status}
        bio={bio}
        date_joined={date_joined}
      />
    );
  }

  render() {
    if (this.props.isLoading) {
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
  isLoading: state.userProfile.isLoading,
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
