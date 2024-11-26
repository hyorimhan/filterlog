'use client';
import { logout } from '@/service/auth';
import useUserInfo from '@/zustand/useUserInfo';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function Logout() {
  const { saveUser, user, saveNickname } = useUserInfo();
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

      if (response.message) {
        await queryClient.resetQueries();
        router.replace('/IE');
        // await queryClient.invalidateQueries({ queryKey: ['user'] });
        // await queryClient.invalidateQueries({ queryKey: ['userData'] });

        toast.success(response.message);
      } else {
        ('로그아웃에 실패했습니다');
      }
    } catch (error) {
      toast.error('오류가 발생했습니다');
    }
  };

  return (
    <div
      onClick={logoutFunc}
      className=" p-1 shadow-md rounded-md hover:brightness-105 cursor-pointer bg-custom-green-300"
    >
      로그아웃
    </div>
  );
}

export default Logout;
