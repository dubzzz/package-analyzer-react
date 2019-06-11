import React from 'react';

import './FloatingMenu.css';

import { Fab } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import { withRouter, RouteComponentProps } from 'react-router-dom';

type Props = {} & RouteComponentProps;

function FloatingMenu(props: Props) {
  return (
    <div id="floating-menu">
      <Fab color="primary" onClick={() => props.history.push('/')}>
        <Search />
      </Fab>
    </div>
  );
}

export default withRouter(FloatingMenu);
