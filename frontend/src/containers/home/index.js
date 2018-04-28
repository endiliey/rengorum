import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchForums
} from '../../api';
import { Message } from 'semantic-ui-react';
import Loader from '../../components/loader';
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
        description,
        posts_count,
        threads_count,
        last_post
      } = forum;

      let lastPost = null;
      if (last_post) {
        const {
          thread_id,
          thread_name,
          username,
          avatar,
          seconds_elapsed
        } = last_post;

        // TODO
        lastPost = (
          <div>
            {thread_id}
            {thread_name}
            {username}
            {avatar}
            {seconds_elapsed}
          </div>
        );
      }

      return (
        <div key={name} className="forumCard">
          {name}
          {description}
          {posts_count}
          {threads_count}
          {lastPost}
        </div>
      );
    });

    return (
      <div className="homeContainer">
        {forumCardList}
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
