import React, { Component } from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import StatusMessage from '../statusmessage';
import Post from '../post';
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
      error
    } = this.props;

    if (error || isLoading || !name) {
      return (
        <StatusMessage
          error={error || !name} // because a thread name cannot be empty
          errorClassName='thread-error'
          errorMessage={error}
          loading={isLoading}
          loadingMessage={'We are fetching the thread for you'}
          nothing={!name}
          nothingMessage={'No thread to display'}
          type='default'
        />
      );
    }

    const threadPost = (
      <Post
        id={id}
        isThread={true}
        content={content}
        createdAt={createdAt}
        creator={creator}
      />
    );

    const postsList = posts.length === 0 ? null : posts.map((post) => {
      const {
        id: postID,
        content: postContent,
        created_at: postCreatedAt,
        creator: postCreator
      } = post;

      return (
        <Post
          id={postID}
          isThread={false}
          content={postContent}
          createdAt={postCreatedAt}
          creator={postCreator}
        />
      );
    });

    return (
      <div className="threadContainer">
        <div className='thread-title'>
          <Icon name={pinned ? 'pin' : 'talk outline'} />
          {name}
        </div>
        <Segment.Group className="thread-list">
          {threadPost}
          {postsList}
        </Segment.Group>
      </div>
    );
  }
}
