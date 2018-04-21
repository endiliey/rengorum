import React, { Component } from 'react';
import {
  convertFromRaw
} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './styles.css';
import { Editor } from 'react-draft-wysiwyg';

const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

export default class RichEditor extends Component {
  constructor(props) {
    super(props);
    const contentState = convertFromRaw(content);
    this.state = {
      contentState,
    }
  }

  onContentStateChange: Function = (contentState) => {
    this.setState({
      contentState,
    });
  };

  render() {
    const { contentState } = this.state;
    return (
      <Editor
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onContentStateChange={this.onContentStateChange}
      />
    );
  }
}
