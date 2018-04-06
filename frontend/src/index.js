import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import store from './store';
import HeaderContainer from './containers/header';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div className="container">
        <HeaderContainer />
        <Switch>
          <Route path="/login" component={App} /> // TODO Login
          <Route path="/register" component={App} /> // TODO Register
          <Route path="/" component={App} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  ,document.getElementById('root')
);
registerServiceWorker();
