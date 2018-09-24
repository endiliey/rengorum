import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Segment, Grid, Icon} from 'semantic-ui-react';
import StatusMessage from '../statusmessage';
import Avatar from '../avatar';
import './styles.css';

export default class ForumList extends Component {
  render() {
    const {isLoading, error, forums} = this.props;

    if (error || !forums || isLoading || forums.length === 0) {
      return (
        <StatusMessage
          error={error || !forums}
          errorClassName="home-error"
          errorMessage={error}
          loading={isLoading}
          loadingMessage={'We are fetching the homepage for you'}
          nothing={forums && forums.length === 0}
          nothingMessage={'No forum to display'}
          nothingClassName="home-error"
          type="default"
        />
      );
    }

    const forumCardList = forums.map(forum => {
      const {
        name,
        slug,
        description,
        posts_count,
        threads_count,
        last_activity,
      } = forum;

      let lastActivity = (
        <div className="home-text home-vertical">{'—  No activity —'}</div>
      );

      if (last_activity) {
        let {
          thread_id,
          thread_name,
          username,
          avatar,
          pinned,
          naturaltime,
        } = last_activity;

        thread_name =
          thread_name.length > 43
            ? thread_name.substring(0, 43) + '...'
            : thread_name;
        lastActivity = (
          <div className="home-row">
            <Avatar
              className="home-avatar"
              avatar={avatar}
              centered={false}
              link={`/user/${username}`}
            />
            <div className="home-column">
              <div>
                <Icon name={pinned ? 'pin' : 'talk outline'} />
                <Link to={`/thread/${thread_id}`}>{thread_name}</Link>
              </div>
              <div className="home-meta">
                <Link to={`/user/${username}`}>
                  <Icon name="user" />
                  {username}
                </Link>
                <b>{`  —  ${naturaltime}`}</b>
              </div>
            </div>
          </div>
        );
      }

      return (
        <Segment vertical key={slug}>
          <Grid textAlign="left" padded="horizontally">
            <Grid.Column width={7}>
              <Grid.Row>
                <Icon name="edit" />
                <Link to={`/forum/${slug}`}>{name}</Link>
              </Grid.Row>
              <Grid.Row>{description}</Grid.Row>
            </Grid.Column>
            <Grid.Column width={3}>
              <div className="home-column home-stats home-vertical">
                <div style={{paddingBottom: '5px'}}>
                  <Icon name="write" />
                  {threads_count}
                  {threads_count > 1 ? ' threads' : ' thread'}
                </div>
                <div>
                  <Icon name="comment outline" />
                  {posts_count}
                  {posts_count > 1 ? ' posts' : ' post'}
                </div>
              </div>
            </Grid.Column>
            <Grid.Column width={6}>{lastActivity}</Grid.Column>
          </Grid>
        </Segment>
      );
    });

    return (
      <div className="homeContainer">
        <Segment.Group className="home-list">{forumCardList}</Segment.Group>
      </div>
    );
  }
}
