import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchForum
} from '../../api';
import {
  Message,
  Segment,
  Grid,
  Icon
} from 'semantic-ui-react';
import Loader from '../../components/loader';
import Avatar from '../../components/avatar';
import './styles.css';

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
    const {
      isLoading,
      error,
      name,
      slug,
      description,
      threads
    } = this.props;

    if (isLoading) {
      return (
        <div className="forum-loading">
          <Loader />
          <br />
          <Message size="tiny">
            <Message.Content>
              <Message.Header>Just few seconds</Message.Header>
              We are fetching the forum for you.
            </Message.Content>
          </Message>
          <br /><br />
        </div>
      );
    } else if (error || !threads) {
        return (
          <div className="forum-error">
            <Message negative={true}>
              <Message.Content>
                {error || "Error"}
              </Message.Content>
            </Message>
          </div>
        );
    } else if (threads.length === 0) {
        return (
          <div className="forum-error">
            <Message negative={true}>
              <Message.Content>
                No threads to display
              </Message.Content>
            </Message>
          </div>
        );
    }

    const threadList = threads.map((thread) => {
      const {
        id,
        name,
        pinned,
        creator,
        avatar,
        naturaltime,
        replies_count,
        last_activity
      } = thread;

      let lastActivity = (
        <div className='forum-text forum-vertical'>
          {'—  No activity —'}
        </div>
      );

      if (last_activity) {
        lastActivity = (
          <div className='forum-row'>
              <Avatar
                className='forum-avatar'
                avatar={last_activity.avatar}
                centered={false}
                link={`/user/${last_activity.username}`}
              />
              <div className="forum-column">
                <div className='forum-name'>
                  {last_activity.name}
                </div>
                <div className='forum-meta'>
                  <Link to={`/user/${last_activity.username}`}>
                    <Icon name='user ' />
                    {last_activity.username}
                  </Link>
                  <b>{`  —  ${last_activity.naturaltime}`}</b>
                </div>
              </div>
          </div>
        );
      }

      return (
        <Segment vertical>
          <Grid textAlign='left' padded='horizontally'>
            <Grid.Column width={7}>
              <Grid.Row>
                <div className='forum-row'>
                  <Avatar
                    className='forum-avatar'
                    avatar={avatar}
                    centered={false}
                    link={`/user/${creator}`}
                  />
                  <div className="forum-column">
                    <div>
                      {pinned ? <Icon name='pin' /> : <Icon name='talk outline' /> }
                      <Link to={`/thread/${id}`}>
                        {name}
                      </Link>
                    </div>
                    <div className='forum-meta'>
                      <Link to={`/user/${creator}`}>
                        <Icon name='user ' />
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
                  <Icon name='comment outline' />
                  {replies_count}
                  {replies_count > 1 ? ' replies' : ' reply'}
                </div>
              </div>
            </Grid.Column>
            <Grid.Column width={6}>
              {lastActivity}
            </Grid.Column>
          </Grid>
        </Segment>
      );
    });

    return (
      <div className="forumContainer">
        <Segment.Group className="forum-list">
          {threadList}
        </Segment.Group>
      </div>
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
