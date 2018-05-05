import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Segment,
  Grid,
  Icon,
  Divider
} from 'semantic-ui-react';
import RichEditor from '../richeditor';
import StatusMessage from '../statusmessage';
import Avatar from '../avatar';
import './styles.css';

export default class Thread extends Component {
  render() {
    const {
      isLoading,
      name,
      content,
      pinned,
      creator,
      createdAt,
      posts,
      error
    } = this.props;

    if (error || isLoading ) {
      return (
        <StatusMessage
          error={error}
          errorClassName='thread-error'
          errorMessage={error}
          loading={isLoading}
          loadingMessage={'We are fetching the thread for you'}
          type='default'
        />
      );
    }

    const threadPost = (
      <Segment key={name}>
        <Grid textAlign='left' padded='horizontally'>
          <Grid.Column width={4}>
            <Grid.Row>
              <div className='thread-row'>
                <Avatar
                  className='thread-avatar'
                  avatar={creator.avatar}
                  centered={false}
                  link={`/user/${creator.username}`}
                />
                <div className="thread-column">
                  <div className='thread-name'>
                    {creator.name}
                  </div>
                  <div className='thread-username'>
                    <Link to={`/user/${creator.username}`}>
                      <Icon name='user' />
                      {creator.username}
                    </Link>
                  </div>
                  <div className='thread-status'>
                    {creator.status || 'Member'}
                  </div>
                </div>
              </div>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={12}>
            <div className='thread-time'>
              {createdAt}
            </div>
            {content}
          </Grid.Column>
        </Grid>
      </Segment>
    );

    const postsList = posts.length === 0 ? null : posts.map((post) => {
      const {
        id: postID,
        content: postContent,
        created_at: postCreatedAt,
        creator: postCreator
      } = post;

      return (
        <Segment key={postID}>
          <Grid textAlign='left' padded='horizontally'>
            <Grid.Column width={4}>
              <Grid.Row>
                <div className='thread-row'>
                  <Avatar
                    className='thread-avatar'
                    avatar={postCreator.avatar}
                    centered={false}
                    link={`/user/${postCreator.username}`}
                  />
                  <div className="thread-column">
                    <div className='thread-name'>
                      {postCreator.name}
                    </div>
                    <div className='thread-username'>
                      <Link to={`/user/${postCreator.username}`}>
                        <Icon name='user' />
                        {postCreator.username}
                      </Link>
                    </div>
                    <div className='thread-status'>
                      {postCreator.status || 'Member'}
                    </div>
                  </div>
                </div>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={12}>
              <div className='thread-time'>
                {postCreatedAt}
              </div>
              {postContent}
            </Grid.Column>
          </Grid>
        </Segment>
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
        <RichEditor />
      </div>
    );
  }
}
