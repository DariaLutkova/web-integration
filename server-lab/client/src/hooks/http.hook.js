import { useState, useCallback } from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        if (body) {
            body = JSON.stringify(body);
            headers['Content-Type'] = 'application/json';
        }

        setLoading(true);
        try {
            const res = await fetch(url, {method, body, headers});
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Something went wrong' );
            setLoading(false);

            return data;
        } catch (err) {
            setLoading(false);
            setError(err.message);

            throw err;
        }
    }, [])

    const clearError = useCallback(() => setError(null), []);

    return { loading, request, error, clearError };
}