import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createPost,
  fetchThread
} from '../../actions';
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
    const { thread: threadID } = this.props.match.params;
    const {
      isLoading,
      name,
      content,
      pinned,
      creator,
      createdAt,
      posts,
      error,
      isAuthenticated,
      createPost,
      newPostLoading,
      newPostError,
      newPostSuccess
    } = this.props;
    return (
      <Thread
        id={threadID}
        isLoading={isLoading}
        name={name}
        content={content}
        pinned={pinned}
        creator={creator}
        createdAt={createdAt}
        posts={posts}
        error={error}
        isAuthenticated={isAuthenticated}
        createPost={createPost}
        newPostSuccess={newPostSuccess}
        newPostLoading={newPostLoading}
        newPostError={newPostError}
      />
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
  isAuthenticated: state.auth.isAuthenticated,
  newPostSuccess: state.thread.newPostSuccess,
  newPostLoading: state.thread.newPostLoading,
  newPostError: state.thread.newPostError
});

const mapDispatchToProps = (dispatch) => ({
  fetchThread: (thread) => {
    dispatch(fetchThread(thread));
  },
  createPost: (newPost) => {
    dispatch(createPost(newPost));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreadContainer);
