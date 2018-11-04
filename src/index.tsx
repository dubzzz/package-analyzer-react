import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import './index.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import DetailsPage from './components/DetailsPage';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <Router basename={process.env.PUBLIC_URL}>
      <div id="main">
        <h1>Package Analyzer</h1>
        <Route exact path="/" component={SearchPage} />
        <Route path="/details/:package" component={DetailsPage} />
      </div>
    </Router>
  </Provider>,
  rootElement
);
