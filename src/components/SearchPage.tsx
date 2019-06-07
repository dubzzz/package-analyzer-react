import React, { Fragment } from 'react';
import PackageSelector from './search/PackageSelector';
import RouteRedirect from './router/RouteRedirect';

function SearchPage() {
  return (
    <Fragment>
      <RouteRedirect />
      <PackageSelector />
    </Fragment>
  );
}

export default SearchPage;
