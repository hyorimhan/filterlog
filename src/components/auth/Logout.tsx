'use client';
import {logout} from '@/service/auth';
import useBlogInfo from '@/zustand/useBlogInfo';
import useUserInfo from '@/zustand/useUserInfo';
import {useQueryClient} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';
import toast from 'react-hot-toast';

function Logout() {
  const {saveUser, user, saveNickname} = useUserInfo();
  const {saveBlogInfo} = useBlogInfo();
  const router = useRouter();
  const queryClient = useQueryClient();
  const logoutFunc = async () => {
    if (!user) {
      toast.error('이미 로그아웃 상태입니다');
      return null;
    }
    try {
      const response = await logout();
      saveUser(null);
      saveNickname(null);
      saveBlogInfo(null);
      await queryClient.resetQueries();

      if (response.message) {
        router.replace('/IE');

        toast.success(response.message);
      } else {
        toast.error('로그아웃에 실패했습니다');
      }
    } catch (error) {
      toast.error('오류가 발생했습니다');
    }
  };

  return (
    <div
      role="button"
      onClick={logoutFunc}
      className=" p-1 shadow-md rounded-md hover:brightness-105 cursor-pointer bg-custom-green-300">
      로그아웃
    </div>
  );
}

export default Logout;
