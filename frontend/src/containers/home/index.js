import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchForums
} from '../../api';
import {
  Message,
  Image,
  Segment,
  Grid,
  Icon
} from 'semantic-ui-react';
import Loader from '../../components/loader';
import Avatar from '../../components/avatar';
import './styles.css';

class Home extends Component {
  componentDidMount() {
    this.props.fetchForums();
  }

  render() {
    const {
      isLoading,
      error,
      forums
    } = this.props;

    if (isLoading) {
      return (
        <div className="home-loading">
          <Loader />
          <br />
          <Message size="tiny">
            <Message.Content>
              <Message.Header>Just one second</Message.Header>
              We are fetching the homepage for you.
            </Message.Content>
          </Message>
          <br /><br />
        </div>
      );
    } else if (error || !forums) {
        return (
          <div className="home-error">
            <Message negative={true}>
              <Message.Content>
                {error || "Error"}
              </Message.Content>
            </Message>
          </div>
        );
    } else if (forums.length === 0) {
        return (
          <div className="home-error">
            <Message negative={true}>
              <Message.Content>
                No forum to display
              </Message.Content>
            </Message>
          </div>
        );
    }

    const forumCardList = forums.map((forum) => {
      const {
        name,
        slug,
        description,
        posts_count,
        threads_count,
        last_activity,
      } = forum;

      let lastActivity = (
        <div className='home-text home-vertical'>
          {'—  No activity —'}
        </div>
      );

      if (last_activity) {
        const {
          thread_id,
          thread_name,
          username,
          avatar,
          pinned,
          naturaltime
        } = last_activity;

        lastActivity = (
          <div className='home-row'>
              <Avatar
                className='home-avatar'
                avatar={avatar}
                centered={false}
                link={`/user/${username}`}
              />
              <div className="home-column">
                <div>
                  {pinned ? <Icon name='pin' /> : <Icon name='talk outline' /> }
                  <Link to={`/thread/${thread_id}`}>
                  {thread_name}
                  </Link>
                </div>
                <div className='home-meta'>
                  <Link to={`/user/${username}`}>
                    <Icon name='user ' />{username}
                  </Link>
                    <b>{`  —  ${naturaltime}`}</b>
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
                <Icon name='edit' />
                <Link to={`/forum/${slug}`}>{name}</Link>
              </Grid.Row>
              <Grid.Row>
                {description}
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={3}>
              <div className="home-column home-stats home-vertical">
                <div style={{paddingBottom: '5px'}}>
                  <Icon name='write' />
                  {threads_count} {threads_count > 1 ? 'threads' : 'thread'}
                </div>
                <div>
                  <Icon name='comment outline' />
                  {posts_count} {posts_count > 1 ? 'posts' : 'post'}
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
      <div className="homeContainer">
        <Segment.Group>
          {forumCardList}
        </Segment.Group>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.home.isLoading,
  forums: state.home.forums,
  error: state.home.error
});

const mapDispatchToProps = (dispatch) => ({
  fetchForums: () => {
    dispatch(fetchForums());
  }
});

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomeContainer;
