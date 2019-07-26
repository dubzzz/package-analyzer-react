import React, { createContext, useContext, useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { LoadState } from '../models/LoadState';
import { NpmApi } from '../api/npm/NpmApi';

const defaultPackageDetails = {} as PackageDetailsContextType;
const PackageDetailsContext = createContext(defaultPackageDetails);

export function PackageDetailsProvider<TProps>(props: TProps) {
  const [packages, setPackages] = useState<AllPackageDetails>({});

  const loadPackageDetails = useCallback(async (packageName: string) => {
    if (packages[packageName]) return packages[packageName];

    setPackages(p => ({ ...p, [packageName]: { status: LoadState.OnGoing } }));
    try {
      const r = await NpmApi.deps(packageName);
      const dependencies = Object.keys(r.collected.metadata.dependencies || {});
      setPackages(p => ({ ...p, [packageName]: { status: LoadState.Success, package: { dependencies } } }));
    } catch (_err) {
      setPackages(p => ({ ...p, [packageName]: { status: LoadState.Error } }));
    }
  }, []);

  return <PackageDetailsContext.Provider value={{ packages, loadPackageDetails }} {...props} />;
}

export function usePackageDetails() {
  const context = useContext(PackageDetailsContext);
  if (context === undefined) {
    throw new Error(`usePackageDetails must be used within a PackageDetailsProvider`);
  }
  return context;
}

export type PackageDetails = {
  dependencies: string[];
};

export type PackageDetailsWithStatus =
  | { status: LoadState.Success; package: PackageDetails }
  | { status: LoadState.Error }
  | { status: LoadState.OnGoing };

export type AllPackageDetails = {
  [packageName: string]: PackageDetailsWithStatus;
};

export type PackageDetailsContextType = {
  packages: { [packageName: string]: PackageDetailsWithStatus };
  loadPackageDetails(packageName: string): void;
};
