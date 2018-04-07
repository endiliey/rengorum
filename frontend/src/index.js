import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import store from './store';
import HeaderContainer from './containers/header';
import ModalContainer from './containers/modal';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div className="container">
        <div>
          <HeaderContainer />
          <Switch>
            <Route path="/" component={App} />
          </Switch>
        </div>
        <ModalContainer />
      </div>
    </BrowserRouter>
  </Provider>
  ,document.getElementById('root')
);
registerServiceWorker();
