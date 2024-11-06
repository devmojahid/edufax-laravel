import { useState, useCallback } from 'react';

export function useAdvancedFilter() {
    const [advancedFilters, setAdvancedFilters] = useState([]);

    const addFilter = useCallback((filter) => {
        setAdvancedFilters(prev => [...prev, filter]);
    }, []);

    const removeFilter = useCallback((index) => {
        setAdvancedFilters(prev => prev.filter((_, i) => i !== index));
    }, []);

    const updateFilter = useCallback((index, updates) => {
        setAdvancedFilters(prev => prev.map((filter, i) =>
            i === index ? { ...filter, ...updates } : filter
        ));
    }, []);

    const clearFilters = useCallback(() => {
        setAdvancedFilters([]);
    }, []);

    return {
        advancedFilters,
        addFilter,
        removeFilter,
        updateFilter,
        clearFilters
    };
} 