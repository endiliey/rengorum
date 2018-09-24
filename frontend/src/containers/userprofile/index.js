import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUserProfile} from '../../actions';
import StatusMessage from '../../components/statusmessage';
import Profile from '../../components/profile';
import './styles.css';

class UserProfileContainer extends Component {
  componentDidMount() {
    const {username} = this.props.match.params;
    this.props.fetchUserProfile(username);
  }

  componentWillReceiveProps(newProps) {
    const {username: oldUsername} = this.props.match.params;
    const {username: futureUsername} = newProps.match.params;
    if (oldUsername !== futureUsername) {
      this.props.fetchUserProfile(futureUsername);
    }
  }

  render() {
    const {isLoading, error, profile} = this.props;

    if (error || !profile || isLoading) {
      return (
        <StatusMessage
          error={error || !profile}
          errorClassName="userProfile-error"
          errorMessage={error}
          loading={isLoading}
          loadingMessage={`We are fetching the user profile for you`}
          type="default"
        />
      );
    }

    const {
      name,
      username,
      status,
      bio,
      avatar,
      is_staff,
      date_joined,
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

const mapStateToProps = state => ({
  isLoading: state.userProfile.isLoading,
  profile: state.userProfile.profile,
  error: state.userProfile.error,
});

const mapDispatchToProps = dispatch => ({
  fetchUserProfile: username => {
    dispatch(fetchUserProfile(username));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfileContainer);
