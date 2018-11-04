import React, { Fragment } from 'react';
import PackageSelector from './search/PackageSelector';
import RouteRedirect from './router/RouteRedirect';

export default () => (
  <Fragment>
    <RouteRedirect />
    <PackageSelector fullSize={true} />
  </Fragment>
);
