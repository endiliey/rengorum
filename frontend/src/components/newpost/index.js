import React, {Component} from 'react';
import {getSelectedBlock} from 'draftjs-utils';
import htmlToDraft from 'html-to-draftjs';
import {List} from 'immutable';
import {EditorState, convertToRaw, Modifier} from 'draft-js';
import {Form, Icon, Button} from 'semantic-ui-react';
import './styles.css';
import RichEditor from '../richeditor';
import StatusMessage from '../statusmessage';

export default class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  componentWillReceiveProps(newProps) {
    const {success} = newProps;
    if (success) {
      this.setState({
        editorState: EditorState.createEmpty(),
      });
    }
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    });
  };

  onSubmit = () => {
    const {editorState} = this.state;
    const {threadID, createPost} = this.props;
    const content = JSON.stringify(
      convertToRaw(editorState.getCurrentContent()),
    );
    let newPost = {
      thread_id: threadID,
      content: content,
    };
    createPost(newPost);
  };

  isValidLength = contentState => {
    const maxLength = this.props.maxLength || 1000;
    return contentState.getPlainText('').length <= maxLength;
  };

  handleBeforeInput = input => {
    const {editorState} = this.state;
    if (!this.isValidLength(editorState.getCurrentContent())) {
      return 'handled';
    }
  };

  handlePastedText = (text, html, editorState, onChange) => {
    if (html) {
      const contentBlock = htmlToDraft(html);
      let contentState = editorState.getCurrentContent();
      contentBlock.entityMap.forEach((value, key) => {
        contentState = contentState.mergeEntityData(key, value);
      });
      contentState = Modifier.replaceWithFragment(
        contentState,
        editorState.getSelection(),
        new List(contentBlock.contentBlocks),
      );
      if (!this.isValidLength(contentState)) {
        return 'handled';
      }
      onChange(
        EditorState.push(editorState, contentState, 'insert-characters'),
      );
      return true;
    }
    const selectedBlock = getSelectedBlock(editorState);
    const newState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      text,
      editorState.getCurrentInlineStyle(),
    );
    if (!this.isValidLength(newState)) {
      return 'handled';
    }
    onChange(EditorState.push(editorState, newState, 'insert-characters'));
    if (selectedBlock && selectedBlock.type === 'code') {
      return true;
    }
    return false;
  };

  render() {
    const {isAuthenticated, isLoading, error} = this.props;
    if (!isAuthenticated) {
      return (
        <div className="newPost-none">{'Please sign in to post a reply'}</div>
      );
    }
    const {editorState} = this.state;
    const statusMessage = (
      <StatusMessage
        error={error}
        errorClassName="newPost-message"
        errorMessage={error || 'Oops! Something went wrong.'}
        type="modal"
      />
    );

    return (
      <div className="newPost-show">
        {statusMessage}
        <Form loading={isLoading} className="attached fluid segment">
          <RichEditor
            placeholder="Start typing your post content here..."
            editorState={editorState}
            wrapperClassName="newPost-wrapper"
            toolbarClassName="newPost-toolbar"
            editorClassName="newPost-editor"
            onEditorStateChange={this.onEditorStateChange}
            handleBeforeInput={this.handleBeforeInput}
            handlePastedText={this.handlePastedText}
          />
          <Button
            color="blue"
            size="small"
            loading={isLoading}
            disabled={isLoading}
            onClick={this.onSubmit}>
            <Icon name="write" />
            Post
          </Button>
        </Form>
      </div>
    );
  }
}
