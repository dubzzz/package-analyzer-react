import React from 'react';

import './QueryError.css';
import Button from '@material-ui/core/Button';
import Refresh from '@material-ui/icons/Refresh';

interface Props {
  error: string;
  retry: () => void;
}
type State = {};

class QueryError extends React.Component<Props, State> {
  render() {
    return (
      <div className="query-error">
        <p>Query failed with error: {this.props.error}</p>
        <Button variant="contained" onClick={() => this.props.retry()}>
          Retry <Refresh />
        </Button>
      </div>
    );
  }
}

export default QueryError;
