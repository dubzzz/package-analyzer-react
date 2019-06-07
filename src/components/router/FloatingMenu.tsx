import React from 'react';
import { connect } from 'react-redux';

import './FloatingMenu.css';
import { ReduxState } from '../../redux/reducers';
import { Dispatch, bindActionCreators, Action } from 'redux';

import { redirectToPageAction } from '../../redux/actions';
import { Fab } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import { PageType } from '../../redux/reducers/router';

interface Props extends StateProps, DispatchProps {}
type State = {};

class FloatingMenu extends React.Component<Props, State> {
  render() {
    return (
      <div id="floating-menu">
        <Fab color="primary" onClick={() => this.props.redirectToPageAction({ page: PageType.SearchPage })}>
          <Search />
        </Fab>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({});
type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  ...bindActionCreators({ redirectToPageAction }, dispatch)
});
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FloatingMenu);
