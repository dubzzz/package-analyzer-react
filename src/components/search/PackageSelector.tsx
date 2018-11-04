import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';

import './PackageSelector.css';
import { ReduxState } from '../../redux/reducers';
import { Dispatch, bindActionCreators, Action } from 'redux';

import TextField from '@material-ui/core/TextField';
import {
  fetchPackagesListAction,
  switchToPackageDetailsModeAction,
  switchToSearchModeAction
} from '../../redux/actions';
import QueryError from './QueryError';
import QueryResults from './QueryResults';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import Http from '@material-ui/icons/Http';
import Error from '@material-ui/icons/Error';
import Done from '@material-ui/icons/Done';

interface Props extends StateProps, DispatchProps {
  fullSize: boolean;
}
type State = { currentQuery: string };

export class PackageSelector extends React.Component<Props, State> {
  static NumResultsPerQuery = 9;
  constructor(props: Props) {
    super(props);
    this.state = { currentQuery: props.query };
  }
  fetchQuery(query: string) {
    if (!this.props.fullSize) {
      this.props.switchToSearchModeAction();
    }
    this.props.fetchPackagesListAction(query, PackageSelector.NumResultsPerQuery);
  }
  fetch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.currentTarget.value;
    this.setState({ currentQuery: query });
    this.fetchQuery(query);
  }
  openPackage(packageName: string) {
    this.props.switchToPackageDetailsModeAction(packageName);
  }
  render() {
    const adornmentIcon =
      this.state.currentQuery !== this.props.query ? <Http /> : this.props.error == null ? <Done /> : <Error />;
    return (
      <div id="package-selector" className={this.props.fullSize ? 'full-size-selector' : 'side-selector'}>
        <TextField
          id="package-name-input"
          label="Package Name"
          variant="outlined"
          onChange={(event: ChangeEvent<HTMLInputElement>) => this.fetch(event)}
          onClick={() => this.props.switchToSearchModeAction()}
          value={this.state.currentQuery}
          InputProps={{
            endAdornment: <InputAdornment position="start">{adornmentIcon}</InputAdornment>
          }}
        />
        {this.props.fullSize ? (
          this.props.error == null ? (
            <QueryResults
              query={this.props.query}
              results={this.props.results}
              selectPackage={(packageName: string) => this.openPackage(packageName)}
            />
          ) : (
            <QueryError error={this.props.error} retry={() => this.fetchQuery(this.state.currentQuery)} />
          )
        ) : (
          undefined
        )}
      </div>
    );
  }
}

function mapStateToProps(state: ReduxState) {
  return { ...state.packageDetails.suggestions };
}
type StateProps = ReturnType<typeof mapStateToProps>;

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    ...bindActionCreators(
      { fetchPackagesListAction, switchToPackageDetailsModeAction, switchToSearchModeAction },
      dispatch
    )
  };
}
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PackageSelector);
