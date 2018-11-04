import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import './index.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import DetailsPage from './components/DetailsPage';
import { endOfRedirectAction } from './redux/actions';

const onEnter = (s: typeof store) => {
  if (s.getState().packageDetails.hasToRedirect) s.dispatch(endOfRedirectAction());
};

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div id="main">
        <h1>Package Analyzer</h1>
        <Route exact path="/" component={SearchPage} onEnter={() => onEnter(store)} />
        <Route path="/details/:package" component={DetailsPage} onEnter={() => onEnter(store)} />
      </div>
    </Router>
  </Provider>,
  rootElement
);
