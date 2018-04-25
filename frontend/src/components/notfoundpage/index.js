import React, { Component } from 'react';
import './styles.css';

class NotFoundPage extends Component {
  render() {
    return (
      <div className="not-found-page">
        <h1>404 - Page Not Found</h1>
        <img alt="" src="https://i.imgur.com/yG7L3Lb.gif" />
        <p>Sorry, but the page you were trying to view does not exist.</p>
      </div>
    );
  }
}
export default NotFoundPage;
