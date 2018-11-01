export type PackageSearchResult = {
  package: {
    author: {
      name: string;
      email: string;
    };
    date: string;
    name: string;
    description: string;
    version: string;
    keywords: string[];
    links: {
      bugs?: string;
      homepage?: string;
      npm?: string;
      repository?: string;
    };
  };
  score: {
    detail: {
      maintenance: number;
      popularity: number;
      quality: number;
    };
    final: number;
  };
  searchScore: number;
};
export type PackagesList = PackageSearchResult[];

export class PackageApi {
  static async list(query: string, num: number) {
    const url = `https://api.npms.io/v2/search/suggestions?q=${encodeURIComponent(query)}&size=${num}`;
    const response = await fetch(url);
    return (await response.json()) as PackagesList;
  }
}
