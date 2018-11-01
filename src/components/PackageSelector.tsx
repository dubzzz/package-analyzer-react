import React from 'react';
import { connect } from 'react-redux';

import './PackageSelector.css';
import { ReduxState } from '../redux/reducers';
import { Dispatch, bindActionCreators, Action } from 'redux';

import TextField from '@material-ui/core/TextField';

interface Props extends StateProps, DispatchProps {}
type State = {};

export class PackageSelector extends React.Component<Props, State> {
  render() {
    return <TextField label="Package Name" variant="outlined" />;
  }
}

function mapStateToProps(state: ReduxState) {
  return {};
}
type StateProps = ReturnType<typeof mapStateToProps>;

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return { ...bindActionCreators({}, dispatch) };
}
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PackageSelector);
