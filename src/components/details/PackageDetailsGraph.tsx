import React, { Fragment } from 'react';

import './PackageDetailsGraph.css';

import { ForceGraph2D } from 'react-force-graph';

import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { LoadState } from '../../models/LoadState';
import { useDependencyGraph } from '../../hooks/DependencyGraph';
import { useWindowDimensions } from '../../hooks/WindowDimensions';

type Props = {
  packageName: string;
};

const DefaultWidth = 800;
const DefaultHeight = 600;

function PackageDetailsGraph(props: Props) {
  const { graph, numLoading, total } = useDependencyGraph(props.packageName);
  const { width } = useWindowDimensions();

  if (numLoading > 0) {
    return (
      <Fragment>
        <CircularProgress />
        <div>Currently loading {numLoading} package(s)...</div>
        <div>Over {total} detected</div>
      </Fragment>
    );
  }

  const graphWidth = width >= DefaultWidth ? DefaultWidth : width;
  const graphHeight = Math.floor((graphWidth * DefaultHeight) / DefaultWidth);

  // WARNING: ForceGraph2D performs side-effects on nodes/links
  const nodes = graph.nodes.map(n => {
    switch (n.status) {
      case LoadState.Error:
        return { id: n.label, color: 'red' };
      case LoadState.OnGoing:
        return { id: n.label, color: 'green' };
      case LoadState.Success:
        const f = Math.min(64 * n.depth, 255 - 64);
        const fstring = f < 16 ? `0${f.toString(16)}` : f.toString(16);
        return { id: n.label, color: `#${fstring}${fstring}ff` };
    }
  });
  const links = graph.links.map(l => ({ ...l }));

  return (
    <div className="package-details">
      <h2>
        {props.packageName} ({total} packages)
      </h2>
      <div className="package-force-directed">
        <div style={{ textAlign: 'left', display: 'inline-block', width: `${graphWidth}px` }}>
          <ForceGraph2D
            graphData={{ nodes, links }}
            nodeLabel="id"
            width={graphWidth}
            height={graphHeight}
            linkDirectionalParticles={1}
          />
        </div>
      </div>
    </div>
  );
}

export default PackageDetailsGraph;
