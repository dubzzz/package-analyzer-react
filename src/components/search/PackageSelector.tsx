import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import './PackageSelector.css';
import { ReduxState } from '../../redux/reducers';
import { Dispatch, bindActionCreators, Action } from 'redux';

import TextField from '@material-ui/core/TextField';
import { redirectToPageAction } from '../../redux/actions';
import QueryError from './QueryError';
import QueryResults from './QueryResults';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import Http from '@material-ui/icons/Http';
import Error from '@material-ui/icons/Error';
import Done from '@material-ui/icons/Done';
import { PageType } from '../../redux/reducers/router';
import { SearchObjectType } from '../../redux/sagas/models/searchResponseType';
import { PackageApi } from '../../redux/sagas/PackageApi';

type Props = {} & StateProps & DispatchProps;

const NumResultsPerQuery = 9;

enum QueryState {
  Success = 'success',
  Error = 'error',
  OnGoing = 'ongoing'
}

type SuccessSearchResult = {
  query: string;
  state: QueryState.Success;
  results: SearchObjectType[];
};
type ErrorSearchResult = {
  query: string;
  state: QueryState.Error;
  error: string;
};
type SearchResult = SuccessSearchResult | ErrorSearchResult;

function PackageSelector(props: Props) {
  // Live data for the on-going search
  const [liveQuery, setLiveQuery] = useState('');
  const [liveStatus, setLiveStatus] = useState(QueryState.Success);
  // Data coming from the last successful/failed search
  const [search, setSearch] = useState<SearchResult>({ query: '', state: QueryState.Success, results: [] });

  const refQuery = useRef(liveQuery);

  const runQuery = () => {
    const query = refQuery.current;
    setLiveStatus(QueryState.OnGoing);
    PackageApi.list(query, NumResultsPerQuery).then(
      results => {
        if (refQuery.current !== query) return;
        setLiveStatus(QueryState.Success);
        setSearch({ query, state: QueryState.Success, results });
      },
      error => {
        if (refQuery.current !== query) return;
        setLiveStatus(QueryState.Error);
        setSearch({ query, state: QueryState.Error, error: (error as any).message || String(error) });
      }
    );
  };
  useEffect(
    () => {
      refQuery.current = liveQuery;
      runQuery();
    },
    [liveQuery]
  );

  const adornmentIcon =
    liveStatus === QueryState.OnGoing ? <Http /> : liveStatus === QueryState.Success ? <Done /> : <Error />;
  return (
    <div id="package-selector">
      <TextField
        id="package-name-input"
        label="Package Name"
        variant="outlined"
        onChange={(event: ChangeEvent<HTMLInputElement>) => setLiveQuery(event.currentTarget.value)}
        value={liveQuery}
        InputProps={{
          endAdornment: <InputAdornment position="start">{adornmentIcon}</InputAdornment>
        }}
      />
      {search.state === QueryState.Success ? (
        <QueryResults
          query={search.query}
          results={search.results}
          selectPackage={(packageName: string) => {
            props.redirectToPageAction({ page: PageType.DetailsPage, packageName });
          }}
        />
      ) : (
        <QueryError error={search.error} retry={() => runQuery()} />
      )}
      <QueryError error={'Fake Error to replay'} retry={() => runQuery()} />
    </div>
  );
}

const mapStateToProps = (state: ReduxState) => ({});
type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  ...bindActionCreators({ redirectToPageAction }, dispatch)
});
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

// TODO: Investigate typings issue on connect
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PackageSelector as any);
