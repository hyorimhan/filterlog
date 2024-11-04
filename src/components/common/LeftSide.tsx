import Link from 'next/link';
import React, { Dispatch, SetStateAction, useState } from 'react';
import SearchBar from '../blog/myBlog/SearchBar';
import useBlogInfo from '@/zustand/useBlogInfo';
import useUserInfo from '@/zustand/useUserInfo';

function LeftSide({
  searchWord,
  setSearchWord,
}: {
  searchWord: string;
  setSearchWord: Dispatch<SetStateAction<string>>;
}) {
  const user = useUserInfo((state) => state.user);
  const { ownerId } = useBlogInfo();
  const isOwner = user?.id === ownerId;
  const [] = useState<string>('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };
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
        <SearchBar searchWord={searchWord} onChange={handleSearch} />
      </div>
    </div>
  );
}

export default LeftSide;
