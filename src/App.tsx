import React, { Component } from 'react';
import './App.css';
import PackageSelector from './components/PackageSelector';

class App extends Component {
  render() {
    return (
      <div id="main">
        <h1>Package Analyzer</h1>
        <PackageSelector />
      </div>
    );
  }
}

export default App;
