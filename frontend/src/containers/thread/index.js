import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchThread
} from '../../api';
import Thread from '../../components/thread';

class ThreadContainer extends Component {
  componentDidMount() {
    const { thread } = this.props.match.params;
    this.props.fetchThread(thread);
  }

  componentWillReceiveProps(newProps) {
    const { thread } = this.props.match.params;
    const { thread: newThread } = newProps.match.params;
    if (thread !== newThread) {
      this.props.fetchThread(newThread);
    }
  }

  render() {
    return (
      <Thread {...this.props} />
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.thread.isLoading,
  name: state.thread.name,
  content: state.thread.content,
  pinned: state.thread.pinned,
  creator: state.thread.creator,
  createdAt: state.thread.createdAt,
  posts: state.thread.posts,
  error: state.thread.error,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
  fetchThread: (thread) => {
    dispatch(fetchThread(thread));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreadContainer);
