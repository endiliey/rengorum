import React, {Component} from 'react';
import {Segment, Icon} from 'semantic-ui-react';
import StatusMessage from '../statusmessage';
import Post from '../post';
import NewPost from '../newpost';
import './styles.css';

export default class Thread extends Component {
  render() {
    const {
      id,
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
      newPostSuccess,
      newPostLoading,
      newPostError,
      authenticatedUsername,
      authenticatedIsStaff,
      deletePostList,
      deletePost,
      isDeleting,
      deleteError,
      deleteThread,
    } = this.props;

    if (error || deleteError || isLoading || isDeleting || !name) {
      let loadingMessage = 'We are fetching the thread for you';
      if (isDeleting) {
        loadingMessage = 'We are deleting the thread for you';
      }
      return (
        <StatusMessage
          error={error || deleteError || !name} // because a thread name cannot be empty
          errorClassName="thread-error"
          errorMessage={error || deleteError}
          loading={isLoading || isDeleting}
          loadingMessage={loadingMessage}
          nothing={!name}
          nothingMessage={'Thread does not exist'}
          type="default"
        />
      );
    }

    const threadPost = (
      <Post
        id={id}
        threadID={id}
        isThread={true}
        content={content}
        createdAt={createdAt}
        creator={creator}
        authenticatedUsername={authenticatedUsername}
        authenticatedIsStaff={authenticatedIsStaff}
        deleteAction={deleteThread}
      />
    );

    const postsList =
      posts.length === 0
        ? null
        : posts.map(post => {
            const {
              id: postID,
              content: postContent,
              created_at: postCreatedAt,
              creator: postCreator,
            } = post;

            return (
              <Post
                key={postID}
                threadID={id}
                id={postID}
                isThread={false}
                content={postContent}
                createdAt={postCreatedAt}
                creator={postCreator}
                authenticatedUsername={authenticatedUsername}
                authenticatedIsStaff={authenticatedIsStaff}
                deletePostList={deletePostList}
                deleteAction={deletePost}
              />
            );
          });

    return (
      <div className="threadContainer">
        <div className="thread-title">
          <Icon name={pinned ? 'pin' : 'talk outline'} />
          {name}
        </div>
        <Segment.Group className="thread-list">
          {threadPost}
          {postsList}
        </Segment.Group>
        <NewPost
          isAuthenticated={isAuthenticated}
          threadID={id}
          createPost={createPost}
          success={newPostSuccess}
          isLoading={newPostLoading}
          error={newPostError}
          maxLength={2000}
        />
      </div>
    );
  }
}
