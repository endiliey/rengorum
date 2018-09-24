import React, {Component} from 'react';
import {Icon, Message} from 'semantic-ui-react';
import Loader from '../loader';
import './styles.css';

export default class StatusMessage extends Component {
  render() {
    const {
      loading,
      loadingClassName,
      loadingMessage,
      error,
      errorClassName,
      errorMessage,
      success,
      successClassName,
      successMessage,
      nothing,
      nothingClassName,
      nothingMessage,
      type,
    } = this.props;

    if (loading) {
      if (type === 'modal') {
        return (
          <div className={loadingClassName || 'statusMessage-modal'}>
            <Message attached icon>
              <Message.Content>
                <Icon name="circle notched" loading size="big" />
                {loadingMessage || 'Loading ...'}
              </Message.Content>
            </Message>
          </div>
        );
      }
      return (
        <div className={loadingClassName || 'statusMessage-default'}>
          <Loader />
          <br />
          <Message size="tiny">
            <Message.Content>
              <Message.Header>Just few seconds</Message.Header>
              {loadingMessage || 'We are fetching the content for you.'}
            </Message.Content>
          </Message>
        </div>
      );
    } else if (error) {
      if (type === 'modal') {
        return (
          <div className={errorClassName || 'statusMessage-modal'}>
            <Message attached error icon>
              <Message.Content>
                <Icon name="thumbs outline down" size="big" />
                {errorMessage || error || 'Sorry, something went wrong'}
              </Message.Content>
            </Message>
          </div>
        );
      }
      return (
        <div className={errorClassName || 'statusMessage-default'}>
          <Message error>
            <Message.Content>
              <Icon name="thumbs outline down" size="big" />
              {errorMessage || error || 'Sorry, something went wrong'}
            </Message.Content>
          </Message>
        </div>
      );
    } else if (success) {
      if (type === 'modal') {
        return (
          <div className={successClassName || 'statusMessage-modal'}>
            <Message attached positive icon>
              <Message.Content>
                <Icon name="thumbs outline up" size="big" />
                {successMessage || 'Successful'}
              </Message.Content>
            </Message>
          </div>
        );
      }
      return (
        <div className={successClassName || 'statusMessage-default'}>
          <Message positive>
            <Message.Content>
              <Icon name="thumbs outline up" size="big" />
              {successMessage || 'Successful'}
            </Message.Content>
          </Message>
        </div>
      );
    } else if (nothing) {
      if (type === 'modal') {
        return (
          <div className={nothingClassName || 'statusMessage-modal'}>
            <Message attached error icon>
              <Message.Content>
                <Icon name="thumbs outline down" size="big" />
                {nothingMessage || 'Successful'}
              </Message.Content>
            </Message>
          </div>
        );
      }
      return (
        <div className={nothingClassName || 'statusMessage-default'}>
          <Message error>
            <Message.Content>
              <Icon name="thumbs outline down" size="big" />
              {nothingMessage || 'Nothing to display'}
            </Message.Content>
          </Message>
        </div>
      );
    }
    return null;
  }
}
