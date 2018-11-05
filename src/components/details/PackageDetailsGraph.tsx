import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import './PackageDetailsGraph.css';
import { ReduxState } from '../../redux/reducers';
import { Dispatch, bindActionCreators, Action } from 'redux';

import { ForceGraph2D } from 'react-force-graph';

import { fetchMultiplePackagesDetailsAction } from '../../redux/actions';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { DependenciesStatus } from '../../redux/reducers/details';

type ComponentProps = {
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

type Props = ComponentProps & StateProps & DispatchProps;

class PackageDetailsGraph extends React.Component<Props, State> {
  static DefaultWidth = 800;
  static DefaultHeight = 600;
  constructor(props: Props) {
    super(props);
    this.state = { ...this.computeState(this.props), width: window.innerWidth };
  }
  computeState(props: Props) {
    const nodes: { label: string; color: string }[] = [];
    const links: { source: string; target: string }[] = [];
    const unscanned: string[] = [];
    let ready = true;

    let total = 0;
    let numLoading = 0;
    const antiDuplicates: { [packageName: string]: true } =
      props.packageName != null ? { [props.packageName]: true } : {};
    const unvisited = props.packageName != null ? [props.packageName] : [];
    while (unvisited.length > 0) {
      ++total;
      const currentPackage = unvisited.pop()!;
      const deps = props.knownDependencies[currentPackage];
      if (deps == null) {
        nodes.push({ color: 'black', label: currentPackage });
        unscanned.push(currentPackage);
        ready = false;
        continue;
      }
      switch (deps.status) {
        case DependenciesStatus.Error:
          nodes.push({ color: 'red', label: currentPackage });
          break;
        case DependenciesStatus.OnGoing:
          nodes.push({ color: 'green', label: currentPackage });
          ++numLoading;
          ready = false;
          break;
        case DependenciesStatus.Success:
        default:
          nodes.push({ color: 'blue', label: currentPackage });
          break;
      }
      for (const requirement of deps.dependencies) {
        links.push({ target: currentPackage, source: requirement });
        if (!antiDuplicates[requirement]) {
          unvisited.push(requirement);
          antiDuplicates[requirement] = true;
        }
      }
    }
    if (unscanned.length > 0) {
      console.warn(`Asking some more packages: `, unscanned);
      this.props.fetchMultiplePackagesDetailsAction(unscanned);
    }
    return ready ? { data: { nodes, links }, total, numLoading } : { total, numLoading };
  }
  componentWillReceiveProps(nextProps: Props) {
    const state = { ...this.state, ...this.computeState(nextProps) };
    if (JSON.stringify(this.state) !== JSON.stringify(state)) {
      this.setState(state);
    }
  }
  render() {
    if (this.state.data == null) {
      return (
        <Fragment>
          <CircularProgress />
          <div>Currently loading {this.state.numLoading} package(s)...</div>
          <div>Over {this.state.total} detected</div>
        </Fragment>
      );
    }
    const nodes = this.state.data.nodes.map(n => ({ id: n.label, color: n.color }));
    const links = this.state.data.links;
    const width =
      this.state.width >= PackageDetailsGraph.DefaultWidth ? PackageDetailsGraph.DefaultWidth : this.state.width;
    const height = Math.floor((width * PackageDetailsGraph.DefaultHeight) / PackageDetailsGraph.DefaultWidth);
    return (
      <div className="package-details">
        <h2>
          {this.props.packageName} ({this.state.data.nodes.length} packages)
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
}

function mapStateToProps(state: ReduxState) {
  return {
    knownDependencies: state.details.knownDependencies
  };
}
type StateProps = ReturnType<typeof mapStateToProps>;

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return { ...bindActionCreators({ fetchMultiplePackagesDetailsAction }, dispatch) };
}
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PackageDetailsGraph);
