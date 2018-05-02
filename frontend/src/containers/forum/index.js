import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchForum
} from '../../api';
import ThreadList from '../../components/threadlist';

class Forum extends Component {
  componentDidMount() {
    const { forum } = this.props.match.params;
    this.props.fetchForum(forum);
  }

  componentWillReceiveProps(newProps) {
    const { forum: oldForum } = this.props.match.params;
    const { forum: futureForum } = newProps.match.params;
    if (oldForum !== futureForum) {
      this.props.fetchForum(futureForum);
    }
  }

  render() {
    return (
      <ThreadList {...this.props} />
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.forum.isLoading,
  name: state.forum.name,
  slug: state.forum.slug,
  description: state.forum.description,
  threads: state.forum.threads,
  error: state.forum.error
});

const mapDispatchToProps = (dispatch) => ({
  fetchForum: (forum) => {
    dispatch(fetchForum(forum));
  }
});

const ForumContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Forum);

export default ForumContainer;
