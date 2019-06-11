import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { LoadState } from '../models/LoadState';
import { PackageApi } from '../redux/sagas/PackageApi';

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
  const refPackages = useRef(packages);
  const loadingPackages = useRef<{ [packageName: string]: true }>({});

  useEffect(
    () => {
      refPackages.current = packages;
    },
    [packages]
  );

  const getPackageDetails = (packageName: string) => {
    const packageDetails = packages[packageName];
    if (packageDetails) return packageDetails;

    const newPackageDetails: PackageDetailsWithStatus = { status: LoadState.OnGoing };
    if (loadingPackages.current[packageName]) return newPackageDetails;

    loadingPackages.current = { ...loadingPackages.current, [packageName]: true };
    setPackages({ ...packages, [packageName]: newPackageDetails });
    PackageApi.deps(packageName).then(
      r => {
        const dependencies = Object.keys(r.collected.metadata.dependencies || {});
        setPackages({
          ...refPackages.current,
          [packageName]: { status: LoadState.Success, package: { dependencies } }
        });
      },
      _err => {
        setPackages({ ...refPackages.current, [packageName]: { status: LoadState.Error } });
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
