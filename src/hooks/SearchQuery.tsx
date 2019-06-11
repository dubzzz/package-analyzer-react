import { useState, useEffect, useRef } from 'react';
import { LoadState } from '../models/LoadState';

export function useSearchQuery<TR>(
  defaultQuery: string,
  defaultResults: TR,
  queryToResults: (q: string) => Promise<TR>
) {
  const [query, setQuery] = useState(defaultQuery);
  const [status, setStatus] = useState(LoadState.Success);
  const refQuery = useRef(query);

  const [lastSearch, setLastSearch] = useState<SearchResult<TR>>({
    query: defaultQuery,
    state: LoadState.Success,
    results: defaultResults
  });

  const runQuery = () => {
    const ongoingQuery = refQuery.current;
    setStatus(LoadState.OnGoing);
    queryToResults(ongoingQuery).then(
      results => {
        if (refQuery.current !== ongoingQuery) return;
        setStatus(LoadState.Success);
        setLastSearch({ query: ongoingQuery, state: LoadState.Success, results });
      },
      error => {
        if (refQuery.current !== ongoingQuery) return;
        setStatus(LoadState.Error);
        setLastSearch({
          query: ongoingQuery,
          state: LoadState.Error,
          error: (error as any).message || String(error)
        });
      }
    );
  };
  useEffect(
    () => {
      refQuery.current = query;
      runQuery();
    },
    [query]
  );
  return { query, status, setQuery, runQuery, lastSearch };
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
