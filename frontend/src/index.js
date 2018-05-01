import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import Loader from './components/loader';
import store, { persistor } from './store';
import HeaderContainer from './containers/header';
import ModalContainer from './containers/modal';
import UserProfileContainer from './containers/userprofile';
import UsersContainer from './containers/users';
import HomeContainer from './containers/home';
import NotFoundPage from './components/notfoundpage';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <BrowserRouter>
        <div>
          <header className="header-background" />
          <div className="app-layout">
            <HeaderContainer />
            <Switch>
              <Route path="/app" component={App} />
              <Route path="/users" component={UsersContainer} />
              <Route path="/user/:username" component={UserProfileContainer} />
              <Route exact path="/" component={HomeContainer} />
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
