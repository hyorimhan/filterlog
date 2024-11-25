import Link from 'next/link';
import useBlogInfo from '@/zustand/useBlogInfo';
import useUserInfo from '@/zustand/useUserInfo';
import YearMonthSearch from '../blog/search/YearMonthSearch';
import SearchBar from '../blog/search/SearchBar';

function LeftSide() {
  const user = useUserInfo((state) => state.user);
  const { ownerId } = useBlogInfo();
  const isOwner = user?.id === ownerId;

  return (
    <div className=" h-[300px] space-y-2 mx-1">
      {isOwner ? (
        <Link href={`/write?ownerId=${ownerId}`} className="text-black text-sm">
          <div className="w-full text-center p-2 rounded-lg  bg-custom-green-600 shadow-sm  hover:brightness-105">
            글쓰기
          </div>
        </Link>
      ) : (
        ''
      )}

      <YearMonthSearch />
      <SearchBar />
    </div>
  );
}

export default LeftSide;
