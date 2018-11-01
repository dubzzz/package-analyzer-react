import React from 'react';

import './QueryResults.css';
import { PackageSearchResult } from '../redux/sagas/PackageApi';

interface Props {
  query: string;
  results: PackageSearchResult[];
}
type State = {};

class QueryResults extends React.Component<Props, State> {
  render() {
    if (this.props.query.length === 0) {
      return <div id="query-results" />;
    }
    const header = (
      <p>
        <u>Results for query:</u> <em>{this.props.query}</em>
      </p>
    );
    if (this.props.results.length === 0) {
      return (
        <div id="query-results">
          {header}
          <p>No results</p>
        </div>
      );
    }
    return (
      <div id="query-results">
        {header}
        <ul>
          {this.props.results.map(r => (
            <li>{r.package.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default QueryResults;
