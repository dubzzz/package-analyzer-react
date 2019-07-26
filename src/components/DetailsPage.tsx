import React, { Fragment } from 'react';
import PackageDetailsGraph from './details/PackageDetailsGraph';
import FloatingMenu from './menu/FloatingMenu';

type MatchType = { params: { package: string } };
type PropsType = { match: MatchType };

function DetailsPage(props: PropsType) {
  return (
    <Fragment>
      <FloatingMenu />
      <PackageDetailsGraph packageName={decodeURIComponent(props.match.params.package)} />
    </Fragment>
  );
}

export default DetailsPage;
