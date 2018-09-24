import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Segment, Grid, Icon, Dropdown} from 'semantic-ui-react';
import RichEditor from '../richeditor';
import Avatar from '../avatar';
import './styles.css';

export default class Post extends Component {
  onDelete = () => {
    const {deleteAction, id, threadID, isThread} = this.props;
    if (isThread) {
      deleteAction(threadID);
    } else {
      deleteAction(id, threadID);
    }
  };

  render() {
    const {
      id,
      isThread,
      content,
      createdAt,
      creator,
      authenticatedUsername,
      authenticatedIsStaff,
      deletePostList,
    } = this.props;

    const color = isThread ? 'black' : null;
    const deleteText = isThread ? 'Delete Thread' : 'Delete Post';
    const actions = (
      <div className="post-dropdown">
        <Dropdown simple icon="caret down" direction="left">
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={this.onDelete}
              icon="delete"
              text={deleteText}
            />
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
    const isLoading = !isThread && deletePostList.indexOf(id) >= 0;
    return (
      <Segment loading={isLoading} color={color}>
        <Grid textAlign="left" padded="horizontally">
          <Grid.Column width={4}>
            <Grid.Row>
              <div className="post-row">
                <Avatar
                  className="post-avatar"
                  avatar={creator.avatar}
                  centered={false}
                  link={`/user/${creator.username}`}
                />
                <div className="post-column">
                  <div className="post-name">{creator.name}</div>
                  <div className="post-username">
                    <Link to={`/user/${creator.username}`}>
                      <Icon name="user" />
                      {creator.username}
                    </Link>
                  </div>
                  <div className="post-status">
                    {creator.status || 'Member'}
                  </div>
                </div>
              </div>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={12}>
            <div className="post-time">
              {createdAt}
              {(authenticatedIsStaff ||
                authenticatedUsername === creator.username) &&
                actions}
            </div>
            <RichEditor
              readOnly={true}
              content={content}
              wrapperClassName={
                false ? 'post-wrapper-edit' : 'post-wrapper-read'
              }
              editorClassName="post-editor"
              toolbarClassName="post-toolbar"
            />
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}
