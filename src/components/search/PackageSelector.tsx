import React, { ChangeEvent } from 'react';

import './PackageSelector.css';

import TextField from '@material-ui/core/TextField';
import QueryError from './QueryError';
import QueryResults from './QueryResults';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import Http from '@material-ui/icons/Http';
import Error from '@material-ui/icons/Error';
import Done from '@material-ui/icons/Done';
import { NpmApi } from '../../api/npm/NpmApi';
import { useSearchQuery } from '../../hooks/SearchQuery';
import { LoadState } from '../../models/LoadState';
import { withRouter, RouteComponentProps } from 'react-router-dom';

type Props = {} & RouteComponentProps;

const NumResultsPerQuery = 9;

function PackageSelector(props: Props) {
  const { query, status, setQuery, runQuery, lastSearch } = useSearchQuery('', [], (q: string) =>
    NpmApi.list(q, NumResultsPerQuery)
  );

  const adornmentIcon = status === LoadState.OnGoing ? <Http /> : status === LoadState.Success ? <Done /> : <Error />;
  return (
    <div id="package-selector">
      <TextField
        id="package-name-input"
        label="Package Name"
        variant="outlined"
        onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.currentTarget.value)}
        value={query}
        InputProps={{
          endAdornment: <InputAdornment position="start">{adornmentIcon}</InputAdornment>
        }}
      />
      {lastSearch.state === LoadState.Success ? (
        <QueryResults
          query={lastSearch.query}
          results={lastSearch.results}
          selectPackage={(packageName: string) => {
            props.history.push(`/details/${encodeURIComponent(packageName)}`);
          }}
        />
      ) : (
        <QueryError error={lastSearch.error} retry={() => runQuery()} />
      )}
    </div>
  );
}

export default withRouter(PackageSelector);
