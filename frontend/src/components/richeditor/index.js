import React, { Component } from 'react';
import { getSelectedBlock } from "draftjs-utils";
import htmlToDraft from "html-to-draftjs";
import { OrderedMap, List } from "immutable";
import {
  EditorState,
  convertFromRaw,
  Modifier,
  ContentState
} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './styles.css';
import { Editor } from 'react-draft-wysiwyg';
import { imageUpload } from '../../api/image';

const contenta = {"entityMap":{},"blocks":[{"key":"637gr","text":"Hey this editor rocks 😀.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

export default class RichEditor extends Component {
  constructor(props) {
    super(props);
    let {
      content,
      editorState
    } = this.props;
    content = contenta; // test having data from db TODO remove this
    if (content) {
      editorState = EditorState.createWithContent(convertFromRaw(content));
    } else if (!editorState) {
      editorState = EditorState.createEmpty();
    }
    this.state = {
      editorState
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  uploadImageCallBack = (file) => {
    return new Promise(
      (resolve, reject) => {
        imageUpload(file, false)
        .then(response => {
          /* react-draft-wywsgi need data.link as the uploaded image url
          so we had to slightly modify the result from cloudinary response */
          let newResponse = {
            'data': {
              'link': response.data.secure_url
            }
          };
          resolve(newResponse);
        }).catch(error => {
          reject(error);
        });
      }
    );
  };

  isValidLength = (contentState) => {
    const maxLength = this.props.maxLength || 2000;
    return contentState.getPlainText('').length <= maxLength;
  };

  handleBeforeInput = (input) => {
    const { editorState } = this.state;
    if (!this.isValidLength(editorState.getCurrentContent())) {
      return 'handled';
    }
  };


  handlePastedText = (text, html, editorState = this.state.editorState, onChange) => {
    const selectedBlock = getSelectedBlock(editorState);
    if (selectedBlock && selectedBlock.type === "code") {
      const contentState = Modifier.replaceText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        text.trim(),
        editorState.getCurrentInlineStyle()
      );
      if (!this.isValidLength(contentState)) {
        return 'handled';
      }
      onChange(EditorState.push(editorState, contentState, "insert-characters"));
      return true;
    } else if (html) {
        const contentBlock = htmlToDraft(html);
        let contentState = editorState.getCurrentContent();
        contentBlock.entityMap.forEach((value, key) => {
          contentState = contentState.mergeEntityData(key, value);
        });
        contentState = Modifier.replaceWithFragment(
          contentState,
          editorState.getSelection(),
          new List(contentBlock.contentBlocks)
        );
        if (!this.isValidLength(contentState)) {
          return 'handled';
        }
        onChange(EditorState.push(editorState, contentState, "insert-characters"));
        return true;
    }
    const newState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      text.trim(),
      editorState.getCurrentInlineStyle()
    );
    if (!this.isValidLength(newState)) {
      return 'handled';
    }
    onChange(EditorState.push(editorState, newState, 'insert-characters'));
    return false;
  };

  render() {
    const { editorState } = this.state;
    const {
      readOnly
    } = this.props;
    return (
      <Editor
        toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image', 'history'],
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true }, previewImage: true },
            fontFamily: {
              options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Roboto', 'Times New Roman', 'Verdana'],
            }

        }}
        editorState={editorState}
        wrapperClassName="richEditor-wrapper"
        toolbarClassName="richEditor-toolbar"
        editorClassName="richEditor-editor"
        onEditorStateChange={this.onEditorStateChange}
        readOnly={readOnly}
        toolbarHidden={readOnly}
        handleBeforeInput={this.handleBeforeInput}
        handlePastedText={this.handlePastedText}
      />
    );
  }
}
