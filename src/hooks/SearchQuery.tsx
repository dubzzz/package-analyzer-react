import { useState, useEffect } from 'react';
import { LoadState } from '../models/LoadState';

export function useSearchQuery<TR>(
  defaultQuery: string,
  defaultResults: TR,
  queryToResults: (q: string) => Promise<TR>
) {
  const [retry, setRetry] = useState(0);
  const [query, setQuery] = useState(defaultQuery);
  const [status, setStatus] = useState(LoadState.Success);

  const [lastSearch, setLastSearch] = useState<SearchResult<TR>>({
    query: defaultQuery,
    state: LoadState.Success,
    results: defaultResults
  });

  useEffect(
    () => {
      let canceled = false;
      const runQuery = async () => {
        setStatus(LoadState.OnGoing);
        try {
          const results = await queryToResults(query);
          if (canceled) return;

          setStatus(LoadState.Success);
          setLastSearch({ query, state: LoadState.Success, results });
        } catch (err) {
          if (canceled) return;

          setStatus(LoadState.Error);
          setLastSearch({
            query: query,
            state: LoadState.Error,
            error: err.message || String(err)
          });
        }
      };
      runQuery();
      return () => {
        canceled = true;
      };
    },
    [query, retry]
  );
  return { query, status, setQuery, runQuery: () => setRetry(r => r + 1), lastSearch };
}

export type SuccessSearchResult<TR> = {
  query: string;
  state: LoadState.Success;
  results: TR;
};

export type ErrorSearchResult = {
  query: string;
  state: LoadState.Error;
  error: string;
};

export type SearchResult<TR> = SuccessSearchResult<TR> | ErrorSearchResult;
