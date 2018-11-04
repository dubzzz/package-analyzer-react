import React, { Fragment } from 'react';
import PackageSelector from './search/PackageSelector';
import PackageDetailsGraph from './details/PackageDetailsGraph';
import RouteRedirect from './router/RouteRedirect';

type MatchType = { params: { package: string } };
type PropsType = { match: MatchType };

export default (props: PropsType) => (
  <Fragment>
    <RouteRedirect />
    <PackageSelector fullSize={false} />
    <PackageDetailsGraph packageName={props.match.params.package} />
  </Fragment>
);
