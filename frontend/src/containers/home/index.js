import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchForums
} from '../../api';
import ForumList from '../../components/forumlist';

class Home extends Component {
  componentDidMount() {
    this.props.fetchForums();
  }

  render() {
    return (
      <ForumList {...this.props} />
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.home.isLoading,
  forums: state.home.forums,
  error: state.home.error
});

const mapDispatchToProps = (dispatch) => ({
  fetchForums: () => {
    dispatch(fetchForums());
  }
});

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomeContainer;
