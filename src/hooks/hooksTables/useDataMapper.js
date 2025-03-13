import { useCallback } from 'react';

export const useDataMapper = (key) => {

    return useCallback((res) => ({
        items: res.data[key] || [],
        totalPages: res.data.totalPages || 1
    }), [key]);
};