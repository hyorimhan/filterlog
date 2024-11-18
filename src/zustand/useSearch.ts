import { searchType } from '@/types/userBlog';
import { create } from 'zustand';

const useSearch = create<searchType>((set) => ({
  searchWord: '',
  selectedYear: new Date().getFullYear().toString(),
  selectedMonth: (new Date().getMonth() + 1).toString().padStart(2, '0'),
  currentPage: 0,

  setSearchWord: (searchWord) => set({ searchWord }),
  setSelectedYear: (selectedYear) => set({ selectedYear }),
  setSelectedMonth: (selectedMonth) => set({ selectedMonth }),
  setCurrentPage: (currentPage) => set({ currentPage }),
}));
export default useSearch;
