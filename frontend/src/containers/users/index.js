import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchUsers
} from '../../api';
import Loader from '../../components/loader';
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

    if (isLoading) {
      return (
        <div className="users-loading">
          <Loader />
          <br /><br />
          Loading users ...
          <br /><br />
        </div>
      );
    } else if (error || !users) {
        return (
          <div className="users-error">
            {error || "Error"}
          </div>
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
        <div className="userCard">
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
