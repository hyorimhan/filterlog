import { userInfoType } from '@/types/userForm';
import { create } from 'zustand';

const useUserInfo = create<userInfoType>((set) => ({
  user: null,
  nickname: null,
  saveUser: (info) => set({ user: info }),
  saveNickname: (nick) => set({ nickname: nick }),
}));

export default useUserInfo;
