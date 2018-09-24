import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUsers} from '../../actions';
import UserList from '../../components/userlist';

class UsersContainer extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return <UserList {...this.props} />;
  }
}

const mapStateToProps = state => ({
  isLoading: state.users.isLoading,
  users: state.users.users,
  error: state.users.error,
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => {
    dispatch(fetchUsers());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersContainer);
