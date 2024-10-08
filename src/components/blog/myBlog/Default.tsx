'use client';
import User from '@/components/auth/User';
import useUserInfo from '@/zustand/useUserInfo';

function Default() {
  const user = useUserInfo((state) => state.user);
  return (
    <div className="flex">
      <div>
        <div className="w-[200px] h-[290px] border-2 border-y-custom-green-700 border-r-custom-green-700">
          <User email={user?.email} />
        </div>
        <div className="w-[275px] h-[290px]"></div>
      </div>
      <div>오늘 기분은 어떠세요?</div>
    </div>
  );
}

export default Default;
