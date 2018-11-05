import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '../../redux/reducers';
import { Redirect, withRouter } from 'react-router-dom';
import { Dispatch, Action, bindActionCreators } from 'redux';
import { endOfRedirectAction } from '../../redux/actions';
import { PageType, RedirectToDetails } from '../../redux/reducers/router';

interface Props extends StateProps, DispatchProps {}
type State = { endOfRedirectDetected: boolean };

export class RouteRedirect extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { endOfRedirectDetected: false };
  }
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.location !== (this.props as any).location) {
      this.props.endOfRedirectAction();
      this.setState({ endOfRedirectDetected: true });
    } else {
      this.setState({ endOfRedirectDetected: false });
    }
  }
  render() {
    if (!this.props.router.hasToRedirect || this.state.endOfRedirectDetected) return <Fragment />;
    switch (this.props.router.page) {
      case PageType.SearchPage:
        return <Redirect to="/" />;
      case PageType.DetailsPage:
        const packageName = this.props.router.packageName;
        return <Redirect to={`/details/${packageName}`} />;
    }
  }
}

const mapStateToProps = (state: ReduxState) => state;
type StateProps = ReturnType<typeof mapStateToProps>;

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return { ...bindActionCreators({ endOfRedirectAction }, dispatch) };
}
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteRedirect) as any) as any;
