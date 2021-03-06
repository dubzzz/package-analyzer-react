import React from 'react';

import './QueryError.css';
import Button from '@material-ui/core/Button';
import Refresh from '@material-ui/icons/Refresh';

interface Props {
  error: string;
  retry: () => void;
}

function QueryError(props: Props) {
  return (
    <div className="query-error">
      <p>Query failed with error: {props.error}</p>
      <Button variant="contained" onClick={() => props.retry()}>
        Retry <Refresh />
      </Button>
    </div>
  );
}

export default QueryError;
