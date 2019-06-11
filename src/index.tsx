import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import { HashRouter as Router, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import DetailsPage from './components/DetailsPage';
import { PackageDetailsProvider } from './hooks/PackageDetails';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Router>
    <PackageDetailsProvider>
      <div id="main">
        <h1>Package Analyzer</h1>
        <Route exact path="/" component={SearchPage} />
        <Route path="/details/:package" component={DetailsPage} />
      </div>
    </PackageDetailsProvider>
  </Router>,
  rootElement
);
