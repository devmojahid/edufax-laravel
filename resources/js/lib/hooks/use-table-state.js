import { useState, useCallback } from 'react';
import { useLocalStorage } from './use-local-storage';
import { useDebounce } from './use-debounce';

export function useTableState(tableKey, initialState = {}) {
    // Persistent table state
    const [persistedState, setPersistedState] = useLocalStorage(`table-state-${tableKey}`, {
        columnVisibility: {},
        columnOrder: [],
        columnPinning: {},
        density: 'normal',
        ...initialState
    });

    // Local state
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [selectedRows, setSelectedRows] = useState({});
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    });

    // Debounced search value
    const debouncedSearchValue = useDebounce(globalFilter, 500);

    // Update persisted state
    const updatePersistedState = useCallback((updates) => {
        setPersistedState(prev => ({
            ...prev,
            ...updates
        }));
    }, [setPersistedState]);

    // Reset all state
    const resetState = useCallback(() => {
        setSorting([]);
        setColumnFilters([]);
        setGlobalFilter('');
        setSelectedRows({});
        setPagination({
            pageIndex: 0,
            pageSize: 10
        });
        setPersistedState(initialState);
    }, [initialState, setPersistedState]);

    return {
        // State
        sorting,
        setSorting,
        columnFilters,
        setColumnFilters,
        globalFilter,
        setGlobalFilter,
        selectedRows,
        setSelectedRows,
        pagination,
        setPagination,
        persistedState,
        updatePersistedState,
        debouncedSearchValue,
        resetState,
    };
} 