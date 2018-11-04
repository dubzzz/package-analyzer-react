import React from 'react';
import { connect } from 'react-redux';

import './PackageDetailsGraph.css';
import { ReduxState } from '../../redux/reducers';
import { Dispatch, bindActionCreators, Action } from 'redux';

import { ForceGraph2D } from 'react-force-graph';

import { DependenciesStatus } from '../../redux/reducers/packageDetails';
import { fetchMultiplePackagesDetailsAction } from '../../redux/actions';

interface Props extends StateProps, DispatchProps {
  packageName: string;
}
type State = {
  data?: {
    nodes: { label: string; color: string }[];
    links: { source: string; target: string }[];
  };
};

class PackageDetailsGraph extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = this.computeState(this.props);
  }
  computeState(props: Props) {
    const nodes: { label: string; color: string }[] = [];
    const links: { source: string; target: string }[] = [];
    const unscanned: string[] = [];
    let ready = true;

    const antiDuplicates: { [packageName: string]: true } =
      props.packageName != null ? { [props.packageName]: true } : {};
    const unvisited = props.packageName != null ? [props.packageName] : [];
    while (unvisited.length > 0) {
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
    return ready ? { data: { nodes, links } } : {};
  }
  componentWillReceiveProps(nextProps: Props) {
    const state = this.computeState(nextProps);
    if (JSON.stringify(this.state) !== JSON.stringify(state)) {
      this.setState(state);
    }
  }
  render() {
    if (this.props.packageName == null || this.state.data == null) {
      return <div className="package-details no-display" />;
    }
    const nodes = this.state.data.nodes.map(n => ({ id: n.label, color: n.color }));
    const links = this.state.data.links;
    return (
      <div className="package-details">
        <h2>
          {this.props.packageName} ({this.state.data.nodes.length} packages)
        </h2>
        <div className="package-force-directed">
          <ForceGraph2D
            graphData={{ nodes, links }}
            nodeLabel="id"
            width={800}
            height={600}
            linkDirectionalParticles={1}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: ReduxState) {
  return {
    knownDependencies: state.packageDetails.knownDependencies
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
