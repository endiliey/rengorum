import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import {Provider} from 'react-redux';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {PersistGate} from 'redux-persist/integration/react';
import Loader from './components/loader';
import store, {persistor} from './store';
import HeaderContainer from './containers/header';
import ModalContainer from './containers/modal';
import UserProfileContainer from './containers/userprofile';
import UsersContainer from './containers/users';
import ThreadContainer from './containers/thread';
import HomeContainer from './containers/home';
import ForumContainer from './containers/forum';
import NotFoundPage from './components/notfoundpage';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <BrowserRouter>
        <Fragment>
          <header className="header-background" />
          <div className="app-layout">
            <HeaderContainer />
            <Switch>
              <Route path="/users" component={UsersContainer} />
              <Route path="/user/:username" component={UserProfileContainer} />
              <Route path="/forum/:forum" component={ForumContainer} />
              <Route path="/thread/:thread" component={ThreadContainer} />
              <Route exact path="/" component={HomeContainer} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
          <ModalContainer />
        </Fragment>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
