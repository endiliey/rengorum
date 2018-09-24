import React, {Component} from 'react';
import {Icon} from 'semantic-ui-react';
import './styles.css';

export default class Modal extends Component {
  listenKeyboard = event => {
    if (event.key === 'Escape' || event.keyCode === 27) {
      this.props.onClose();
    }
  };

  componentDidMount() {
    if (this.props.onClose) {
      window.addEventListener('keydown', this.listenKeyboard, true);
    }
  }

  componentWillUnmount() {
    if (this.props.onClose) {
      window.removeEventListener('keydown', this.listenKeyboard, true);
    }
  }

  closeModal = () => {
    this.props.onClose();
  };

  onDialogClick = event => {
    event.stopPropagation();
  };

  render() {
    const overlayStyle = this.props.overlayStyle ? this.props.overlayStyle : {};
    const contentStyle = this.props.contentStyle ? this.props.contentStyle : {};
    const dialogStyle = this.props.dialogStyle ? this.props.dialogStyle : {};

    return (
      <div>
        <div className="modal-overlay-div" style={overlayStyle} />
        <div
          className="modal-content-div"
          style={contentStyle}
          onClick={this.closeModal}>
          <div
            className="modal-dialog-div"
            style={dialogStyle}
            onClick={this.onDialogClick}>
            <Icon
              name="window close outline"
              size="large"
              className="modal-close-div"
              onClick={this.closeModal}
            />
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
