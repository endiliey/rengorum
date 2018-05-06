import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Segment,
  Grid,
  Icon,
  Dropdown
} from 'semantic-ui-react';
import RichEditor from '../richeditor';
import Avatar from '../avatar';
import './styles.css';

export default class Post extends Component {
  render() {
    const {
      id,
      isThread,
      content,
      createdAt,
      creator
    } = this.props;

    const color = (isThread ? 'black' : null);
    return (
      <Segment color={color}>
        <Grid textAlign='left' padded='horizontally'>
          <Grid.Column width={4}>
            <Grid.Row>
              <div className='post-row'>
                <Avatar
                  className='post-avatar'
                  avatar={creator.avatar}
                  centered={false}
                  link={`/user/${creator.username}`}
                />
                <div className="post-column">
                  <div className='post-name'>
                    {creator.name}
                  </div>
                  <div className='post-username'>
                    <Link to={`/user/${creator.username}`}>
                      <Icon name='user' />
                      {creator.username}
                    </Link>
                  </div>
                  <div className='post-status'>
                    {creator.status || 'Member'}
                  </div>
                </div>
              </div>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={12}>
            <div className='post-time'>
              {createdAt}
              <div className='post-dropdown'>
                <Dropdown simple icon='caret down' direction='left'>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => console.log('edit' + id)} icon='edit' text='Edit post' />
                    <Dropdown.Item onClick={() => console.log('delete' + id)} icon='delete' text='Delete post' />
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <RichEditor
              readOnly={true}
              content={content}
              wrapperClassName={false ? 'post-wrapper-edit' : 'post-wrapper-read'}
              editorClassName='post-editor'
              toolbarClassName='post-toolbar'
            />
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}
