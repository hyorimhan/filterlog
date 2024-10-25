import { useBlogOwnerId } from '@/types/userBlog';
import { create } from 'zustand';

const useBlogInfo = create<useBlogOwnerId>((set) => ({
  ownerId: null,
  saveOwnerId: (info) => set({ ownerId: info }),
}));

export default useBlogInfo;
