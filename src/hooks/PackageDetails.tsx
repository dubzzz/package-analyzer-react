import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { LoadState } from '../models/LoadState';
import { NpmApi } from '../api/npm/NpmApi';

type PackageDetails = {
  dependencies: string[];
};
export type PackageDetailsWithStatus =
  | { status: LoadState.Success; package: PackageDetails }
  | { status: LoadState.Error }
  | { status: LoadState.OnGoing };
type AllPackageDetails = {
  [packageName: string]: PackageDetailsWithStatus;
};
type PackageDetailsContextType = {
  getPackageDetails(packageName: string): PackageDetailsWithStatus;
};
const defaultPackageDetails = {} as PackageDetailsContextType;
const PackageDetailsContext = createContext(defaultPackageDetails);

export function PackageDetailsProvider<TProps>(props: TProps) {
  const [packages, setPackages] = useState<AllPackageDetails>({});

  const getPackageDetails = (packageName: string) => {
    if (packages[packageName]) return packages[packageName];

    const newPackageDetails: PackageDetailsWithStatus = { status: LoadState.OnGoing };
    setPackages(p => ({ ...p, [packageName]: newPackageDetails }));

    NpmApi.deps(packageName).then(
      r => {
        const dependencies = Object.keys(r.collected.metadata.dependencies || {});
        setPackages(p => ({ ...p, [packageName]: { status: LoadState.Success, package: { dependencies } } }));
      },
      _err => {
        setPackages(p => ({ ...p, [packageName]: { status: LoadState.Error } }));
      }
    );

    return newPackageDetails;
  };

  return <PackageDetailsContext.Provider value={{ getPackageDetails: getPackageDetails }} {...props} />;
}

export function usePackageDetails() {
  const context = useContext(PackageDetailsContext);
  if (context === undefined) {
    throw new Error(`usePackageDetails must be used within a PackageDetailsProvider`);
  }
  return context;
}