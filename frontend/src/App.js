import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Avatar from './components/avatar';
import Loader from './components/loader';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <Avatar
            avatar={'https://avatars3.githubusercontent.com/u/17883920?v=4'}
          />
          <Avatar
            avatar={'https://www.wowkeren.com/images/photo/kang_han_na.jpg'}
          />
          <Avatar
            avatar={'https://y.gtimg.cn/music/photo_new/T001R300x300M000004Bjyj52RTYOj.jpg?max_age=2592000'}
          />
        </p>
        <Loader />
      </div>
    );
  }
}

export default App;
