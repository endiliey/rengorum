import React, { Component } from 'react';
import { connect } from 'react-redux';
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

  render() {
    const {
      isLoading,
      error,
      profile
    } = this.props;

    if (isLoading) {
      return (
        <div className="userProfile-loading">
          <Loader />
          <br /><br />
          Loading user profile ...
          <br /><br />
        </div>
      );
    } else if (error || !profile) {
        return (
          <div className="userProfile-error">
            {error || "Error"}
          </div>
        );
    }

    const {
      name,
      username,
      status,
      bio,
      avatar,
      is_staff,
      date_joined
    } = profile;

    return (
      <Profile
        username={username}
        name={name}
        avatar={avatar}
        status={status}
        bio={bio}
        dateJoined={date_joined}
        isStaff={is_staff}
      />
    );
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
