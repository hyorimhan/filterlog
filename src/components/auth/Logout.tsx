'use client';
import { logout } from '@/service/auth';
import useUserInfo from '@/zustand/useUserInfo';
import toast from 'react-hot-toast';

function Logout() {
  const saveUser = useUserInfo((state) => state.saveUser);
  const user = useUserInfo((state) => state.user);

  const logoutFunc = async () => {
    if (!user) {
      toast.error('이미 로그아웃 상태입니다');
      return null;
    }
    try {
      const response = await logout();
      saveUser(null);

      if (response.message) {
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
