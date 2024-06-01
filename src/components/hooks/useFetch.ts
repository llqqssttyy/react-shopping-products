import { useState } from 'react';
import { HEADERS } from '../../api/common';
import { CommonQueryParams } from '../../types/fetch';
import { generateQueryParams } from '../../utils/generateQueryParams';

interface UseFetchResult<T> {
  loading: boolean;
  error: Error | null;
  fetchData: (queryParams?: CommonQueryParams) => Promise<T | undefined>;
}

interface UseFetchProps {
  url: string;
}

export default function useFetch<T>({ url }: UseFetchProps): UseFetchResult<T> {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (queryParams?: CommonQueryParams) => {
    setLoading(true);
    setError(null);

    const queryString = queryParams ? generateQueryParams(queryParams) : '';
    try {
      const response = await fetch(`${url}?${queryString}`, {
        method: 'GET',
        headers: HEADERS,
      });

      if (!response.ok) throw new Error(`${response.status}`);

      const data = await response.json();
      return data as T;
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, fetchData };
}
