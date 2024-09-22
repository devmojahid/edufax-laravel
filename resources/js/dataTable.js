import { create } from 'zustand'

const useDataTable = create((set) => ({
    filter: "",
    filter_field: "",
    sort_by: "",
    sort_direction: "",
    status: "",
    setFilter: (filter) => set({ filter }),
    setFilterField: (filter_field) => set({ filter_field }),
    setSortBy: (sort_by) => set({ sort_by }),
    setSortDirection: (sort_direction) => set({ sort_direction }),
    setStatus: (status) => set({ status }),
}));

export default useDataTable