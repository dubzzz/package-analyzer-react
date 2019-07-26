import { useState, useEffect } from 'react';
import { usePackageDetails } from './PackageDetails';
import { LoadState } from '../models/LoadState';

function buildInitialState(
  packageName: string
): {
  nodes: DependencyGraphNode[];
  ongoingNodes: DependencyGraphNode[];
  links: DependencyGraphLink[];
} {
  return {
    nodes: [],
    ongoingNodes: [{ label: packageName, depth: 0, status: LoadState.OnGoing }],
    links: []
  };
}

export function useDependencyGraph(packageName: string): DependencyGraph {
  const { packages, loadPackageDetails } = usePackageDetails();
  const [incrementalGraph, setIncrementalGraph] = useState(buildInitialState(packageName));

  const incrementalGraphBuild = (currentGraph: typeof incrementalGraph) => {
    if (currentGraph.ongoingNodes.length === 0) return;

    const nodes = [...currentGraph.nodes];
    const links = [...currentGraph.links];
    const ongoingNodes = [];

    const antiDuplicates = new Set([...currentGraph.nodes, ...currentGraph.ongoingNodes].map(n => n.label));
    const unvisited: { label: string; depth: number }[] = [...currentGraph.ongoingNodes];
    while (unvisited.length > 0) {
      const { label: currentPackage, depth } = unvisited.pop()!;
      let packageDetails = packages[currentPackage];
      if (!packageDetails) {
        packageDetails = { status: LoadState.OnGoing };
        loadPackageDetails(currentPackage);
      }
      const node = { label: currentPackage, depth, status: packageDetails.status };
      switch (packageDetails.status) {
        case LoadState.Error:
          nodes.push(node);
          break;
        case LoadState.OnGoing:
          ongoingNodes.push(node);
          break;
        case LoadState.Success:
          nodes.push(node);
          for (const requirement of packageDetails.package.dependencies) {
            links.push({ target: currentPackage, source: requirement });
            if (!antiDuplicates.has(requirement)) {
              unvisited.push({ label: requirement, depth: depth + 1 });
              antiDuplicates.add(requirement);
            }
          }
          break;
      }
    }
    setIncrementalGraph({ nodes, ongoingNodes, links });
  };

  useEffect(
    () => {
      const graph = buildInitialState(packageName);
      incrementalGraphBuild(graph);
    },
    [packageName]
  );
  useEffect(() => incrementalGraphBuild(incrementalGraph), [packages]);

  return {
    graph: { nodes: incrementalGraph.nodes.concat(incrementalGraph.ongoingNodes), links: incrementalGraph.links },
    numLoading: incrementalGraph.ongoingNodes.length,
    total: incrementalGraph.nodes.length + incrementalGraph.ongoingNodes.length
  };
}

export type DependencyGraphNode = { label: string; depth: number; status: LoadState };
export type DependencyGraphLink = { source: string; target: string };

export type DependencyGraph = {
  graph: {
    nodes: DependencyGraphNode[];
    links: DependencyGraphLink[];
  };
  numLoading: number;
  total: number;
};
