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
  const { getPackageDetails } = usePackageDetails();
  const [incrementalGraph, setIncrementalGraph] = useState(buildInitialState(packageName));

  useEffect(
    () => {
      setIncrementalGraph(buildInitialState(packageName));
    },
    [packageName]
  );
  useEffect(
    () => {
      if (incrementalGraph.ongoingNodes.length === 0) return;

      const nodes = [...incrementalGraph.nodes];
      const links = [...incrementalGraph.links];
      const ongoingNodes = [];

      const antiDuplicates = new Set([...incrementalGraph.nodes, ...incrementalGraph.ongoingNodes].map(n => n.label));
      const unvisited: { label: string; depth: number }[] = [...incrementalGraph.ongoingNodes];
      while (unvisited.length > 0) {
        const { label: currentPackage, depth } = unvisited.pop()!;
        const packageDetails = getPackageDetails(currentPackage);
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
    },
    [getPackageDetails]
  );

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
