import React, { Component } from 'react';
import './App.css';
import PackageSelector from './components/search/PackageSelector';
import PackageDetailsGraph from './components/details/PackageDetailsGraph';

class App extends Component {
  render() {
    return (
      <div id="main">
        <h1>Package Analyzer</h1>
        <PackageSelector />
        <PackageDetailsGraph />
      </div>
    );
  }
}

export default App;
