import { SearchPackageEntry, PackageDetails } from './models';

// Documentation available at:
// https://api-docs.npms.io/
const apiUrl = 'https://api.npms.io';

export class NpmApi {
  static async deps(packageName: string): Promise<PackageDetails> {
    const url = `${apiUrl}/v2/package/${encodeURIComponent(packageName)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`[Status: ${response.status}] ${response.statusText}`);
    return await response.json();
  }
  static async list(query: string, num: number): Promise<SearchPackageEntry[]> {
    if (query.length === 0) {
      return [];
    }
    const url = `${apiUrl}/v2/search/suggestions?q=${encodeURIComponent(query)}&size=${num}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`[Status: ${response.status}] ${response.statusText}`);
    return await response.json();
  }
}
