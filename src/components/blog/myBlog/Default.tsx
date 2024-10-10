'use client';
import User from '@/components/auth/User';
import useUserInfo from '@/zustand/useUserInfo';
import Link from 'next/link';

function Default() {
  const user = useUserInfo((state) => state.user);
  return (
    <div className="flex ">
      <div>
        <div className="w-[200px] h-[290px] border-2 border-y-custom-green-700 border-r-custom-green-700">
          <User email={user?.email} />
        </div>
        <div className="w-[275px] h-[290px]"></div>
      </div>
      <div className="font-galmuri">오늘 기분은 어떠세요?</div>
      <Link href={'/Blog/write'}>글이 아직 없어요! 첫 글을 써보세요</Link>
    </div>
  );
}

export default Default;
