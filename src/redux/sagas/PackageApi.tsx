import { SearchResponseType } from './models/searchResponseType';

// Documentation available at:
// https://api-docs.npms.io/
const apiUrl = 'https://api.npms.io';

export type Deps = {
  collected: {
    metadata: {
      dependencies?: { [packageName: string]: string };
    };
  };
};

export class PackageApi {
  static async deps(packageName: string) {
    const url = `${apiUrl}/v2/package/${encodeURIComponent(packageName)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`[Status: ${response.status}] ${response.statusText}`);
    return (await response.json()) as Deps;
  }
  static async list(query: string, num: number) {
    if (query.length === 0) {
      return [];
    }
    const url = `${apiUrl}/v2/search/suggestions?q=${encodeURIComponent(query)}&size=${num}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`[Status: ${response.status}] ${response.statusText}`);
    return (await response.json()) as SearchResponseType;
  }
}
