import React, {Component} from 'react';
import Loader from '../loader';
import './styles.css';

export default class Button extends Component {
  render() {
    let className = this.props.className || 'btn';
    let disabled = this.props.disabled;

    if (this.props.loading) {
      disabled = true;
    }

    return (
      <button
        className={className}
        disabled={disabled}
        onClick={this.props.onClick}
        type={
          this.props.type
            ? this.props.type
            : this.props.onClick
              ? 'button'
              : 'submit'
        }>
        {this.props.loading ? <Loader /> : this.props.children}
      </button>
    );
  }
}

Button.defaultProps = {
  className: 'btn',
  type: 'submit',
  loading: false,
  disabled: false,
  onClick: null,
};
