import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '../../redux/reducers';
import { Redirect } from 'react-router-dom';

interface Props extends StateProps {}
type State = { currentQuery: string };

export class RouteRedirect extends React.Component<Props, State> {
  render() {
    if (!this.props.packageDetails.hasToRedirect) return <Fragment />;
    const packageName = this.props.packageDetails.packageDetailsMode;
    if (packageName == null) return <Redirect to="/" />;
    return <Redirect to={`/details/${packageName}`} />;
  }
}

const mapStateToProps = (state: ReduxState) => state;
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(RouteRedirect);
