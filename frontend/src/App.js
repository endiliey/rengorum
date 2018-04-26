import React, { Component } from 'react';
import './App.css';
import RichEditor from './components/richeditor';
import UserCard from './components/usercard';

class App extends Component {
  render() {
    return (
      <div className="AppItem">
        <UserCard
          avatar="https://pa1.narvii.com/6426/bb7afeb9eb48c1704ea512a381a76a55783d8091_128.gif"
          name="김지수"
          username="jisoo"
          isStaff={false}
        />
        <UserCard
          avatar="http://78.media.tumblr.com/32fb682ce90ada19abcb413eeb69d5af/tumblr_onfjxud4fU1vaxvogo5_400.png"
          name="배주현"
          username="irene"
          isStaff={true}
        />
      </div>
    );
  }
}

export default App;
