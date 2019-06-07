import React, { ChangeEvent, useState } from 'react';
import { connect } from 'react-redux';

import './PackageSelector.css';
import { ReduxState } from '../../redux/reducers';
import { Dispatch, bindActionCreators, Action } from 'redux';

import TextField from '@material-ui/core/TextField';
import { fetchPackagesListAction, redirectToPageAction } from '../../redux/actions';
import QueryError from './QueryError';
import QueryResults from './QueryResults';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import Http from '@material-ui/icons/Http';
import Error from '@material-ui/icons/Error';
import Done from '@material-ui/icons/Done';
import { PageType } from '../../redux/reducers/router';
import { SearchQueryState } from '../../redux/reducers/search';

type ComponentProps = {};
type Props = ComponentProps & StateProps & DispatchProps;

const NumResultsPerQuery = 9;

function PackageSelector(props: Props) {
  const [currentQuery, setCurrentQuery] = useState(props.query);
  const adornmentIcon =
    currentQuery !== props.query ? <Http /> : props.state === SearchQueryState.Success ? <Done /> : <Error />;
  return (
    <div id="package-selector">
      <TextField
        id="package-name-input"
        label="Package Name"
        variant="outlined"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const query = event.currentTarget.value;
          setCurrentQuery(query);
          props.fetchPackagesListAction(query, NumResultsPerQuery);
        }}
        value={currentQuery}
        InputProps={{
          endAdornment: <InputAdornment position="start">{adornmentIcon}</InputAdornment>
        }}
      />
      {props.state === SearchQueryState.Success ? (
        <QueryResults
          query={props.query}
          results={props.results}
          selectPackage={(packageName: string) => {
            props.redirectToPageAction({ page: PageType.DetailsPage, packageName });
          }}
        />
      ) : (
        <QueryError
          error={props.error}
          retry={() => {
            props.fetchPackagesListAction(currentQuery, NumResultsPerQuery);
          }}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state: ReduxState) => ({ ...state.search });
type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  ...bindActionCreators({ fetchPackagesListAction, redirectToPageAction }, dispatch)
});
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

// TODO: Investigate typings issue on connect
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PackageSelector as any);
