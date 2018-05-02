import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchUsers
} from '../../api';
import StatusMessage from '../../components/statusmessage';
import UserCard from '../../components/usercard';
import './styles.css';

class Users extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const {
      isLoading,
      error,
      users
    } = this.props;

    if (error || !users || isLoading || users.length === 0 ) {
      return (
        <StatusMessage
          error={error || !users}
          errorClassName='users-error'
          errorMessage={error}
          loading={isLoading}
          loadingMessage={`We are fetching the users for you`}
          nothing={users && users.length === 0}
          nothingMessage={`No user to display`}
          nothingClassName='users-error'
          type='default'
        />
      );
    }

    const userCardList = users.map((user) => {
      const {
        name,
        username,
        avatar,
        is_staff
      } = user;

      return (
        <div key={username} className="userCard">
          <UserCard
            username={username}
            name={name}
            avatar={avatar}
            isStaff={is_staff}
          />
        </div>
      );
    });
    return (
      <div className="usersContainer">
        {userCardList}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.users.isLoading,
  users: state.users.users,
  error: state.users.error
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => {
    dispatch(fetchUsers());
  }
});

const UsersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);

export default UsersContainer;
