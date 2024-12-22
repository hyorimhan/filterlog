import useUserInfo from '@/zustand/useUserInfo';
import Link from 'next/link';
import Loading from '../common/Loading';
import Logout from './Logout';
import useUserProfileQuery from '@/hooks/user/useUserProfileQuery';
import { PAGES } from '@/constants/myInfoUrl';
import ProfileImg from '../common/ProfileImg';

function MyInfo() {
  const user_id = useUserInfo((state) => state.user?.id ?? '');
  const { profileData, isLoading } = useUserProfileQuery({ user_id });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <ProfileImg user_id={user_id} />
      <div className="justify-center flex flex-col items-center my-3  py-2 bg-yellow-200">
        <div> {profileData?.nickname}님 행복한 하루 보내세요!</div>
        <div className="my-3 space-x-5 flex items-center">
          {PAGES.map((page) => (
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
