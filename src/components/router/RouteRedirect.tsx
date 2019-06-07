import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '../../redux/reducers';
import { Redirect, withRouter } from 'react-router-dom';
import { Dispatch, Action, bindActionCreators } from 'redux';
import { endOfRedirectAction } from '../../redux/actions';
import { PageType } from '../../redux/reducers/router';

interface Props extends StateProps, DispatchProps {}

function RouteRedirect(props: Props) {
  const [endOfRedirect, setEndOfRedirect] = useState(false);
  const [location, setLocation] = useState<string | null>(null);
  useEffect(() => {
    const newLocation = (props as any).location;
    if (location !== newLocation) {
      props.endOfRedirectAction();
      setEndOfRedirect(true);
    } else {
      setEndOfRedirect(false);
    }
    setLocation(newLocation);
  });
  if (!props.router.hasToRedirect || endOfRedirect) return <Fragment />;
  switch (props.router.page) {
    case PageType.SearchPage:
      return <Redirect to="/" />;
    case PageType.DetailsPage:
      const packageName = props.router.packageName;
      return <Redirect to={`/details/${packageName}`} />;
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
