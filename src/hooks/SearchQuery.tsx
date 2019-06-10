import { useState, useEffect, useRef } from 'react';

export enum SearchState {
  Success = 'success',
  Error = 'error',
  OnGoing = 'ongoing'
}

type SuccessSearchResult<TR> = {
  query: string;
  state: SearchState.Success;
  results: TR;
};
type ErrorSearchResult = {
  query: string;
  state: SearchState.Error;
  error: string;
};
type SearchResult<TR> = SuccessSearchResult<TR> | ErrorSearchResult;

export function useSearchQuery<TR>(
  defaultQuery: string,
  defaultResults: TR,
  queryToResults: (q: string) => Promise<TR>
) {
  const [query, setQuery] = useState(defaultQuery);
  const [status, setStatus] = useState(SearchState.Success);
  const refQuery = useRef(query);

  const [lastSearch, setLastSearch] = useState<SearchResult<TR>>({
    query: defaultQuery,
    state: SearchState.Success,
    results: defaultResults
  });

  const runQuery = () => {
    const ongoingQuery = refQuery.current;
    setStatus(SearchState.OnGoing);
    queryToResults(ongoingQuery).then(
      results => {
        if (refQuery.current !== ongoingQuery) return;
        setStatus(SearchState.Success);
        setLastSearch({ query: ongoingQuery, state: SearchState.Success, results });
      },
      error => {
        if (refQuery.current !== ongoingQuery) return;
        setStatus(SearchState.Error);
        setLastSearch({
          query: ongoingQuery,
          state: SearchState.Error,
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
