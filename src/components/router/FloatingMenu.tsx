import React from 'react';
import { connect } from 'react-redux';

import './FloatingMenu.css';
import { ReduxState } from '../../redux/reducers';
import { Dispatch, bindActionCreators, Action } from 'redux';

import { switchToSearchModeAction } from '../../redux/actions';
import { Button } from '@material-ui/core';
import Search from '@material-ui/icons/Search';

interface Props extends StateProps, DispatchProps {}
type State = {};

class FloatingMenu extends React.Component<Props, State> {
  render() {
    return (
      <div id="floating-menu">
        <Button variant="fab" mini color="primary" onClick={() => this.props.switchToSearchModeAction()}>
          <Search />
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({});
type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  ...bindActionCreators({ switchToSearchModeAction }, dispatch)
});
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FloatingMenu);
