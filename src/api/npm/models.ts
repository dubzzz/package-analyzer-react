export type PackageDetails = {
  collected: {
    metadata: {
      dependencies?: { [packageName: string]: string };
    };
  };
};
export type PackageSummary = {
  name: string;
  scope: string;
  version: string;
  description: string;
  date: string; //2018-05-23T00:23:27.645Z
  links: {
    npm: string;
    homepage: string;
    repository: string;
    bugs: string;
  };
  author?: {
    name?: string;
    username?: string;
    email?: string;
    url?: string;
  };
  publisher: {
    username: string;
    email: string;
  };
  maintainers: {
    username: string;
    email: string;
  }[];
  keywords?: string[];
};
export type SearchScore = {
  final: number;
  detail: {
    quality: number;
    popularity: number;
    maintenance: number;
  };
};
export type SearchPackageEntry = {
  package: PackageSummary;
  score: SearchScore;
  searchScore: number;
  highlight: string;
};
