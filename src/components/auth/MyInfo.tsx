import { useProfileQuery } from '@/hooks/user/useProfileQuery';
import useUserInfo from '@/zustand/useUserInfo';
import Image from 'next/image';
import Link from 'next/link';
import Loading from '../common/Loading';
import Logout from './Logout';

function MyInfo() {
  const user = useUserInfo((state) => state.user);
  const { profileData, profileImg, isLoading } = useProfileQuery({
    user_id: user?.id ?? '',
  });

  if (isLoading) {
    return <Loading />;
  }

  const pages = [
    { href: 'blog/myPage', text: '마이페이지' },
    { href: 'blog', text: '마이블로그' },
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-[20%] ">
        <Image
          src={profileImg ?? '/profile/profile.svg'}
          alt="profileImg"
          width={100}
          height={100}
          className="w-[100px] h-[100px] rounded-full border-2 border-custom-green-600"
        />
      </div>

      <div className="justify-center flex flex-col items-center my-3  py-2 bg-yellow-200">
        <div> {profileData?.nickname}님 행복한 하루 보내세요!</div>
        <div className="my-3 space-x-5 flex items-center">
          {pages.map((page) => (
            <Link href={page.href} key={page.href}>
              <div className=" bg-custom-green-300 hover:brightness-105 shadow-md rounded-md p-1 text-black">
                {page.text}
              </div>
            </Link>
          ))}
        </div>
        <Logout />
      </div>
    </>
  );
}

export default MyInfo;
