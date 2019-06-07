import React from 'react';

import './QueryResults.css';
import PackageQueryResult from './PackageQueryResult';
import { SearchObjectType } from '../../redux/sagas/models/searchResponseType';

interface Props {
  query: string;
  results: SearchObjectType[];
  selectPackage: (packageName: string) => void;
}

function QueryResults(props: Props) {
  const id = 'query-results';
  if (props.query.length === 0) {
    return <div id={id} />;
  }
  if (props.results.length === 0) {
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
          {props.results.map((r, key) => (
            <li key={`li-${key}`}>
              <PackageQueryResult
                key={key}
                package={r.package}
                score={r.score}
                searchScore={r.searchScore}
                select={() => props.selectPackage(r.package.name)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default QueryResults;
