export type Deps = {
  collected: {
    metadata: {
      dependencies?: { [packageName: string]: string };
    };
  };
};
export type PackageSearchResult = {
  package: {
    author?: {
      name: string;
      email: string;
    };
    date: string;
    name: string;
    description: string;
    version: string;
    keywords?: string[];
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
  static async deps(packageName: string) {
    const url = `https://api.npms.io/v2/package/${encodeURIComponent(packageName)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`[Status: ${response.status}] ${response.statusText}`);
    return (await response.json()) as Deps;
  }
  static async list(query: string, num: number) {
    if (query.length === 0) {
      return [];
    }
    const url = `https://api.npms.io/v2/search/suggestions?q=${encodeURIComponent(query)}&size=${num}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`[Status: ${response.status}] ${response.statusText}`);
    return (await response.json()) as PackagesList;
  }
}
