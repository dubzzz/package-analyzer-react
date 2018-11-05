export type SearchPackageType = {
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
export type SearchScoreType = {
  final: number;
  detail: {
    quality: number;
    popularity: number;
    maintenance: number;
  };
};
export type SearchObjectType = {
  package: SearchPackageType;
  score: SearchScoreType;
  searchScore: number;
  highlight: string;
};
export type SearchResponseType = SearchObjectType[];
