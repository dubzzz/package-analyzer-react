import React from 'react';

import './QueryResults.css';
import PackageQueryResult from './PackageQueryResult';
import { SearchObjectType } from '../../redux/sagas/models/searchResponseType';

interface Props {
  query: string;
  results: SearchObjectType[];
  selectPackage: (packageName: string) => void;
}
type State = {};

class QueryResults extends React.Component<Props, State> {
  render() {
    const id = 'query-results';
    if (this.props.query.length === 0) {
      return <div id={id} />;
    }
    if (this.props.results.length === 0) {
      return (
        <div id={id}>
          <p>No results</p>
        </div>
      );
    }
    return (
      <div id={id}>
        <div className="query-results-cards">
          <ul>
            {this.props.results.map((r, key) => (
              <li key={`li-${key}`}>
                <PackageQueryResult
                  key={key}
                  package={r.package}
                  score={r.score}
                  searchScore={r.searchScore}
                  select={() => this.props.selectPackage(r.package.name)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default QueryResults;
