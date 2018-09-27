import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Segment, Grid, Icon} from 'semantic-ui-react';
import StatusMessage from '../statusmessage';
import Avatar from '../avatar';
import './styles.css';

export default class ThreadList extends Component {
  render() {
    const {isLoading, error, threads} = this.props;

    if (error || !threads || isLoading || threads.length === 0) {
      return (
        <StatusMessage
          error={error || !threads}
          errorClassName="forum-error"
          errorMessage={error}
          loading={isLoading}
          loadingMessage={`We are fetching the forum for you`}
          nothing={threads && threads.length === 0}
          nothingMessage={`No threads to display`}
          nothingClassName="forum-error"
          type="default"
        />
      );
    }

    const threadList = threads.map(thread => {
      let {
        id,
        name,
        pinned,
        creator,
        avatar,
        naturaltime,
        replies_count,
        last_activity,
      } = thread;

      name = name.length > 57 ? name.substring(0, 55) + '...' : name;

      let lastActivity = last_activity ? (
        <div className="forum-row">
          <Avatar
            className="forum-avatar"
            avatar={last_activity.avatar}
            centered={false}
            link={`/user/${last_activity.username}`}
          />
          <div className="forum-column">
            <div className="forum-name">{last_activity.name}</div>
            <div className="forum-meta">
              <Link to={`/user/${last_activity.username}`}>
                <Icon name="user" />
                {last_activity.username}
              </Link>
              <b>{`  —  ${last_activity.naturaltime}`}</b>
            </div>
          </div>
        </div>
      ) : (
        <div className="forum-text forum-vertical">{'—  No activity —'}</div>
      );

      return (
        <Segment vertical key={id}>
          <Grid textAlign="left" padded="horizontally">
            <Grid.Column width={7}>
              <Grid.Row>
                <div className="forum-row">
                  <Avatar
                    className="forum-avatar"
                    avatar={avatar}
                    centered={false}
                    link={`/user/${creator}`}
                  />
                  <div className="forum-column">
                    <div>
                      <Icon name={pinned ? 'pin' : 'talk outline'} />
                      <Link to={`/thread/${id}`}>{name}</Link>
                    </div>
                    <div className="forum-meta">
                      <Link to={`/user/${creator}`}>
                        <Icon name="user" />
                        {creator}
                      </Link>
                      <b>{`  —  ${naturaltime}`}</b>
                    </div>
                  </div>
                </div>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={3}>
              <div className="forum-column forum-stats forum-vertical">
                <div style={{paddingBottom: '5px'}}>
                  <Icon name="comment outline" />
                  {replies_count}
                  {replies_count > 1 ? ' replies' : ' reply'}
                </div>
              </div>
            </Grid.Column>
            <Grid.Column width={6}>{lastActivity}</Grid.Column>
          </Grid>
        </Segment>
      );
    });

    return (
      <div className="forumContainer">
        <Segment.Group className="forum-list">{threadList}</Segment.Group>
      </div>
    );
  }
}
