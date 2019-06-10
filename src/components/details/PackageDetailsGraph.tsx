import React, { Fragment } from 'react';

import './PackageDetailsGraph.css';

import { ForceGraph2D } from 'react-force-graph';

import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { usePackageDetails, PackageDetailsWithStatus } from '../../hooks/PackageDetails';
import { LoadState } from '../../models/LoadState';

type Props = {
  packageName: string;
};
type State = {
  data?: {
    nodes: { label: string; color: string }[];
    links: { source: string; target: string }[];
  };
  total: number;
  numLoading: number;
  width: number;
};

function computeState(packageName: string, getPackage: (p: string) => PackageDetailsWithStatus) {
  const nodes: { label: string; color: string }[] = [];
  const links: { source: string; target: string }[] = [];
  let ready = true;

  let total = 0;
  let numLoading = 0;
  const antiDuplicates: { [packageName: string]: true } = { [packageName]: true };
  const unvisited: { name: string; depth: number }[] = [{ name: packageName, depth: 0 }];
  while (unvisited.length > 0) {
    ++total;
    const { name: currentPackage, depth } = unvisited.pop()!;
    const packageDetails = getPackage(currentPackage);
    switch (packageDetails.status) {
      case LoadState.Error:
        nodes.push({ color: 'red', label: currentPackage });
        break;
      case LoadState.OnGoing:
        nodes.push({ color: 'green', label: currentPackage });
        ++numLoading;
        ready = false;
        break;
      case LoadState.Success:
        const f = Math.min(64 * depth, 255 - 64);
        const fstring = f < 16 ? `0${f.toString(16)}` : f.toString(16);
        nodes.push({ color: `#${fstring}${fstring}ff`, label: currentPackage });
        for (const requirement of packageDetails.package.dependencies) {
          links.push({ target: currentPackage, source: requirement });
          if (!antiDuplicates[requirement]) {
            unvisited.push({ name: requirement, depth: depth + 1 });
            antiDuplicates[requirement] = true;
          }
        }
        break;
    }
  }
  return ready ? { data: { nodes, links }, total, numLoading } : { total, numLoading };
}

const DefaultWidth = 800;
const DefaultHeight = 600;
function PackageDetailsGraph(props: Props) {
  const { getPackageDetails: getPackage } = usePackageDetails();
  const state = computeState(props.packageName, getPackage);

  if (state.data == null) {
    return (
      <Fragment>
        <CircularProgress />
        <div>Currently loading {state.numLoading} package(s)...</div>
        <div>Over {state.total} detected</div>
      </Fragment>
    );
  }
  const nodes = state.data.nodes.map(n => ({ id: n.label, color: n.color }));
  const links = state.data.links;
  const width = DefaultWidth;
  const height = Math.floor((width * DefaultHeight) / DefaultWidth);
  return (
    <div className="package-details">
      <h2>
        {props.packageName} ({state.data.nodes.length} packages)
      </h2>
      <div className="package-force-directed">
        <div style={{ textAlign: 'left', display: 'inline-block', width: `${width}px` }}>
          <ForceGraph2D
            graphData={{ nodes, links }}
            nodeLabel="id"
            width={width}
            height={height}
            linkDirectionalParticles={1}
          />
        </div>
      </div>
    </div>
  );
}

export default PackageDetailsGraph;
