import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {getSelectedBlock} from 'draftjs-utils';
import htmlToDraft from 'html-to-draftjs';
import {List} from 'immutable';
import {
  EditorState,
  ContentState,
  convertFromRaw,
  convertToRaw,
  Modifier,
} from 'draft-js';
import {Form, Icon, Divider, Button} from 'semantic-ui-react';
import './styles.css';
import RichEditor from '../richeditor';
import StatusMessage from '../statusmessage';

export default class NewThread extends Component {
  constructor(props) {
    super(props);
    const {name, content} = this.props;
    let editorState = this.convertToEditorState(content);
    this.state = {
      name,
      editorState,
    };
  }

  componentWillReceiveProps(newProps) {
    const {name: newName, content: newContent} = newProps;
    const editorState = this.convertToEditorState(newContent);
    this.setState({
      name: newName,
      editorState,
    });
  }

  convertToEditorState = content => {
    let editorState = EditorState.createEmpty();
    if (content) {
      try {
        const contentState = convertFromRaw(JSON.parse(content));
        editorState = EditorState.createWithContent(contentState);
      } catch (error) {
        const contentState = ContentState.createFromText(content);
        editorState = EditorState.createWithContent(contentState);
      }
    }
    return editorState;
  };

  toggleShowEditor = () => {
    this.props.toggleShowEditor();
  };

  onSave = () => {
    // save to redux store (uncontrolled input way)
    const {name, editorState} = this.state;
    const content = JSON.stringify(
      convertToRaw(editorState.getCurrentContent()),
    );
    this.props.updateNewThread({
      name: name,
      content: content,
    });
    this.toggleShowEditor();
  };

  onCancel = () => {
    // reset & clear everything
    const editorState = EditorState.createEmpty();
    this.setState({
      name: '',
      editorState,
    });
    const content = JSON.stringify(
      convertToRaw(editorState.getCurrentContent()),
    );
    this.props.updateNewThread({
      name: '',
      content: content,
    });
    this.toggleShowEditor();
  };

  onNameChange = (e, {value}) => {
    this.setState({
      name: value,
    });
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    });
  };

  isFormValid = () => {
    const {name} = this.state;
    return name;
  };

  onSubmit = () => {
    if (this.isFormValid()) {
      const {name, editorState} = this.state;
      const {forum, createThread} = this.props;
      const content = JSON.stringify(
        convertToRaw(editorState.getCurrentContent()),
      );
      let newThread = {
        name: name,
        forum: forum,
        content: content,
      };
      createThread(newThread);
    }
  };

  isValidLength = contentState => {
    const maxLength = this.props.maxLength || 100;
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
    const {
      isAuthenticated,
      isLoading,
      success,
      id,
      error,
      showEditor,
    } = this.props;
    const {name, editorState} = this.state;
    if (!isAuthenticated) {
      return <div className="newThread-none" />;
    }

    const statusMessage = (
      <StatusMessage
        error={error}
        errorClassName="newThread-message"
        errorMessage={error || 'Oops! Something went wrong.'}
        success={success}
        successClassName="newThread-message"
        successMessage={
          <Link to={`/thread/${id}`}>{'Successful on creating thread'}</Link>
        }
        type="modal"
      />
    );

    if (!showEditor) {
      return (
        <div>
          {statusMessage} {/*this will only show the success message*/}
          <div className="newThread-hidden">
            <Button
              size="small"
              color="blue"
              floated="left"
              onClick={this.toggleShowEditor}>
              <Icon name="edit" />
              New Thread
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="newThread-show">
        {statusMessage}
        <Form loading={isLoading} className="attached fluid segment">
          <Form.Input
            required
            fluid
            transparent
            icon="edit"
            iconPosition="left"
            size="big"
            placeholder="Name"
            type="text"
            name="name"
            value={name}
            onChange={this.onNameChange}
          />
          <Divider />
          <RichEditor
            placeholder="Start typing your thread content here..."
            editorState={editorState}
            wrapperClassName="newThread-wrapper"
            toolbarClassName="newThread-toolbar"
            editorClassName="newThread-editor"
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
            <Icon name="edit" />
            Post thread
          </Button>
          <Button
            color="red"
            role="none"
            size="small"
            disabled={isLoading}
            onClick={this.onSave}>
            <Icon name="save" />
            Save Draft
          </Button>
          <Button
            role="none"
            size="small"
            disabled={isLoading}
            onClick={this.onCancel}>
            <Icon name="cancel" />
            Clear
          </Button>
        </Form>
      </div>
    );
  }
}
