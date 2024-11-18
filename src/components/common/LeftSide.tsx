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
    <div className=" h-[300px]">
      {isOwner ? (
        <Link
          href={`/blog/write?ownerId=${ownerId}`}
          className="text-black text-sm"
        >
          <div className="w-full text-center p-2 rounded-lg  bg-custom-green-600 shadow-sm  hover:brightness-105">
            글쓰기
          </div>
        </Link>
      ) : (
        ''
      )}
      <Link href={`/blog/guestBook`} className="text-black text-sm">
        <div className="w-full text-center p-2 rounded-lg  bg-custom-green-400 shadow-sm mt-1 hover:brightness-105 ">
          방명록
        </div>
      </Link>
      <div className="rounded-lg w-full text-center border-2 p-2 border-custom-green-400 shadow-sm mt-1 hover:brightness-105 ">
        <SearchBar />
      </div>
      <YearMonthSearch />
    </div>
  );
}

export default LeftSide;
