import { userInfoType } from '@/types/userForm';
import { create } from 'zustand';

const useUserInfo = create<userInfoType>((set) => ({
  user: null,
  saveUser: (info) => set({ user: info }),
}));

export default useUserInfo;
