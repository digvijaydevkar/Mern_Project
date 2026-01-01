import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for fetching data with loading and error states
 * @param {Function} fetchFunction - Async function that returns data
 * @param {Array} dependencies - Dependencies array for useEffect (optional)
 * @returns {Object} { data, loading, error, refetch }
 */
export const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  return { data, loading, error, refetch: fetchData };
};

