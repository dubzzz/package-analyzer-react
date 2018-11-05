import { SearchResponseType } from './models/searchResponseType';

// Documentation available of registry.npmjs.org at:
// https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md
const rootUrl = 'http://registry.npmjs.org/';

export type Deps = {
  collected: {
    metadata: {
      dependencies?: { [packageName: string]: string };
    };
  };
};

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
    return (await response.json()) as SearchResponseType;
  }
}
