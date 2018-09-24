import React, {Component} from 'react';
import {EditorState, ContentState, convertFromRaw} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './styles.css';
import {Editor} from 'react-draft-wysiwyg';
import {imageUploadApi} from '../../api/image';

export default class RichEditor extends Component {
  constructor(props) {
    super(props);
    let {content, editorState} = this.props;
    editorState = editorState || this.convertToEditorState(content);
    this.state = {
      editorState,
    };
  }

  componentWillReceiveProps(newProps) {
    const {editorState: newEditorState, content: newContent} = newProps;
    const editorState = newEditorState || this.convertToEditorState(newContent);
    this.setState({
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

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    });
  };

  uploadImageCallBack = file => {
    return new Promise((resolve, reject) => {
      imageUploadApi(file, false)
        .then(response => {
          /* react-draft-wywsgi need data.link as the uploaded image url
          so we had to slightly modify the result from cloudinary response */
          let newResponse = {
            data: {
              link: response.data.secure_url,
            },
          };
          resolve(newResponse);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  render() {
    const {
      readOnly,
      wrapperClassName,
      toolbarClassName,
      editorClassName,
      handleBeforeInput,
      handlePastedText,
      onEditorStateChange,
      editorState,
      uploadImageCallBack,
      placeholder,
    } = this.props;
    return (
      <Editor
        toolbar={{
          options: [
            'inline',
            'blockType',
            'fontSize',
            'fontFamily',
            'list',
            'textAlign',
            'colorPicker',
            'link',
            'emoji',
            'image',
            'history',
          ],
          inline: {inDropdown: true},
          list: {inDropdown: true},
          textAlign: {inDropdown: true},
          link: {inDropdown: true},
          image: {
            uploadCallback: uploadImageCallBack || this.uploadImageCallBack,
            alt: {present: true},
            previewImage: true,
          },
          fontFamily: {
            options: [
              'Arial',
              'Georgia',
              'Impact',
              'Tahoma',
              'Roboto',
              'Times New Roman',
              'Verdana',
            ],
          },
        }}
        editorState={editorState || this.state.editorState}
        wrapperClassName={wrapperClassName || 'richEditor-wrapper'}
        toolbarClassName={toolbarClassName || 'richEditor-toolbar'}
        editorClassName={editorClassName || 'richEditor-editor'}
        onEditorStateChange={onEditorStateChange || this.onEditorStateChange}
        readOnly={readOnly}
        toolbarHidden={readOnly}
        handleBeforeInput={handleBeforeInput}
        handlePastedText={handlePastedText}
        placeholder={placeholder}
      />
    );
  }
}
