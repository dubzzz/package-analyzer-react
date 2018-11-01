import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';

import './PackageSelector.css';
import { ReduxState } from '../redux/reducers';
import { Dispatch, bindActionCreators, Action } from 'redux';

import TextField from '@material-ui/core/TextField';
import { fetchPackagesListAction } from '../redux/actions';
import QueryResults from './QueryResults';

interface Props extends StateProps, DispatchProps {}
type State = {};

export class PackageSelector extends React.Component<Props, State> {
  static NumResultsPerQuery = 9;
  fetch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.currentTarget.value;
    this.props.fetchPackagesListAction(query, PackageSelector.NumResultsPerQuery);
  }
  render() {
    return (
      <div id="package-selector">
        <TextField
          id="package-name-input"
          label="Package Name"
          variant="outlined"
          onChange={(event: ChangeEvent<HTMLInputElement>) => this.fetch(event)}
        />
        <QueryResults query={this.props.query} results={this.props.results} />
      </div>
    );
  }
}

function mapStateToProps(state: ReduxState) {
  return state.packageDetails.suggestions;
}
type StateProps = ReturnType<typeof mapStateToProps>;

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return { ...bindActionCreators({ fetchPackagesListAction }, dispatch) };
}
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PackageSelector);
