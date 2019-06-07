import React, { Fragment } from 'react';
import PackageDetailsGraph from './details/PackageDetailsGraph';
import RouteRedirect from './router/RouteRedirect';
import FloatingMenu from './router/FloatingMenu';

type MatchType = { params: { package: string } };
type PropsType = { match: MatchType };

function DetailsPage(props: PropsType) {
  return (
    <Fragment>
      <RouteRedirect />
      <FloatingMenu />
      <PackageDetailsGraph packageName={props.match.params.package} />
    </Fragment>
  );
}

export default DetailsPage;
