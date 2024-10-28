import { useBlogType } from '@/types/userBlog';
import { create } from 'zustand';

const useBlogInfo = create<useBlogType>((set) => ({
  ownerId: null,
  saveOwnerId: (info) => set({ ownerId: info }),
  blogInfo: null,
  saveBlogInfo: (info) => set({ blogInfo: info }),
}));

export default useBlogInfo;
