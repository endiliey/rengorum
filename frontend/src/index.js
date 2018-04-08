import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import Loader from './components/loader';
import store, { persistor } from './store';
import HeaderContainer from './containers/header';
import ModalContainer from './containers/modal';
import NotFoundPage from './components/not-found-page';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <BrowserRouter>
        <div className="container">
          <div>
            <HeaderContainer />
            <Switch>
              <Route exact path="/" component={App} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
          <ModalContainer />
        </div>
      </BrowserRouter>
    </PersistGate>
  </Provider>
  ,document.getElementById('root')
);
registerServiceWorker();
