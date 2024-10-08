'use client';
import { logout } from '@/service/auth';
import useUserInfo from '@/zustand/useUserInfo';

function Logout() {
  const saveUser = useUserInfo((state) => state.saveUser);
  const user = useUserInfo((state) => state.user);

  const logoutFunc = async () => {
    if (!user) {
      alert('이미 로그아웃 상태입니다');
      return null;
    }
    try {
      const response = await logout();
      saveUser(null);

      if (response.message) {
        alert(response.message);
      } else {
        ('로그아웃에 실패했습니다');
      }
    } catch (error) {
      alert('오류가 발생했습니다');
    }
  };

  return (
    <button className="mt-3" onClick={logoutFunc}>
      로그아웃
    </button>
  );
}

export default Logout;
