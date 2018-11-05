import React, { ChangeEvent } from 'react';
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
type State = { currentQuery: string };

type Props = ComponentProps & StateProps & DispatchProps;

export class PackageSelector extends React.Component<Props, State> {
  static NumResultsPerQuery = 9;
  constructor(props: Props) {
    super(props);
    this.state = { currentQuery: props.query };
  }
  fetchQuery(query: string) {
    this.props.fetchPackagesListAction(query, PackageSelector.NumResultsPerQuery);
  }
  fetch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.currentTarget.value;
    this.setState({ currentQuery: query });
    this.fetchQuery(query);
  }
  openPackage(packageName: string) {
    this.props.redirectToPageAction({ page: PageType.DetailsPage, packageName });
  }
  render() {
    const adornmentIcon =
      this.state.currentQuery !== this.props.query ? (
        <Http />
      ) : this.props.state === SearchQueryState.Success ? (
        <Done />
      ) : (
        <Error />
      );
    return (
      <div id="package-selector">
        <TextField
          id="package-name-input"
          label="Package Name"
          variant="outlined"
          onChange={(event: ChangeEvent<HTMLInputElement>) => this.fetch(event)}
          value={this.state.currentQuery}
          InputProps={{
            endAdornment: <InputAdornment position="start">{adornmentIcon}</InputAdornment>
          }}
        />
        {this.props.state === SearchQueryState.Success ? (
          <QueryResults
            query={this.props.query}
            results={this.props.results}
            selectPackage={(packageName: string) => this.openPackage(packageName)}
          />
        ) : (
          <QueryError error={this.props.error} retry={() => this.fetchQuery(this.state.currentQuery)} />
        )}
      </div>
    );
  }
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
