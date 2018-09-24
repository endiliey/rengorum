import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createPost, fetchThread, deletePost, deleteThread} from '../../actions';
import Thread from '../../components/thread';

class ThreadContainer extends Component {
  componentDidMount() {
    const {thread} = this.props.match.params;
    this.props.fetchThread(thread);
  }

  componentWillReceiveProps(newProps) {
    const {thread} = this.props.match.params;
    const {thread: newThread} = newProps.match.params;
    if (thread !== newThread) {
      this.props.fetchThread(newThread);
    }
  }

  render() {
    const {thread: threadID} = this.props.match.params;
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
      newPostSuccess,
      authenticatedUsername,
      authenticatedIsStaff,
      deletePostList,
      deletePost,
      isDeleting,
      deleteError,
      deleteThread,
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
        authenticatedUsername={authenticatedUsername}
        authenticatedIsStaff={authenticatedIsStaff}
        deletePostList={deletePostList}
        deletePost={deletePost}
        isDeleting={isDeleting}
        deleteError={deleteError}
        deleteThread={deleteThread}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.thread.isLoading,
  name: state.thread.name,
  content: state.thread.content,
  pinned: state.thread.pinned,
  creator: state.thread.creator,
  createdAt: state.thread.createdAt,
  posts: state.thread.posts,
  error: state.thread.error,
  isAuthenticated: state.auth.isAuthenticated,
  authenticatedUsername: state.auth.username,
  authenticatedIsStaff: state.auth.isStaff,
  newPostSuccess: state.thread.newPostSuccess,
  newPostLoading: state.thread.newPostLoading,
  newPostError: state.thread.newPostError,
  deletePostList: state.thread.deletePostList,
  isDeleting: state.thread.isDeleting,
  deleteError: state.thread.deleteError,
});

const mapDispatchToProps = dispatch => ({
  fetchThread: thread => {
    dispatch(fetchThread(thread));
  },
  createPost: newPost => {
    dispatch(createPost(newPost));
  },
  deletePost: (id, threadID) => {
    dispatch(deletePost(id, threadID));
  },
  deleteThread: id => {
    dispatch(deleteThread(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ThreadContainer);
