import { usePackageDetails } from './PackageDetails';
import { LoadState } from '../models/LoadState';

export function useDependencyGraph(packageName: string): DependencyGraph {
  const { getPackageDetails } = usePackageDetails();
  let total = 0;
  let numLoading = 0;
  const nodes: DependencyGraphNode[] = [];
  const links: DependencyGraphLink[] = [];

  const antiDuplicates = new Set([packageName]);
  const unvisited: { name: string; depth: number }[] = [{ name: packageName, depth: 0 }];

  while (unvisited.length > 0) {
    ++total;
    const { name: currentPackage, depth } = unvisited.pop()!;
    const packageDetails = getPackageDetails(currentPackage);
    nodes.push({ label: currentPackage, depth, status: packageDetails.status });
    switch (packageDetails.status) {
      case LoadState.Error:
        break;
      case LoadState.OnGoing:
        ++numLoading;
        break;
      case LoadState.Success:
        for (const requirement of packageDetails.package.dependencies) {
          links.push({ target: currentPackage, source: requirement });
          if (!antiDuplicates.has(requirement)) {
            unvisited.push({ name: requirement, depth: depth + 1 });
            antiDuplicates.add(requirement);
          }
        }
        break;
    }
  }

  return { graph: { nodes, links }, numLoading, total };
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
