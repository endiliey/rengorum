import React, { Component } from 'react';
import './test.css';
import UserCard from './components/usercard';
import RichEditor from './components/richeditor';

class Test extends Component {
  render() {
    return (
      <div className='testContainer'>
        <RichEditor />
      </div>
    );
  }
}

export default Test;
