'use client';
import Loading from '@/components/common/Loading';
import { allUsers } from '@/service/blog';
import useSearch from '@/zustand/useSearch';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ReactPaginate from 'react-paginate';

function AllBlogger() {
  const { setCurrentPage, currentPage } = useSearch();
  const { data: allUserData, isLoading } = useQuery({
    queryKey: ['allUserData'],
    queryFn: () => allUsers(currentPage),
  });

  if (isLoading) {
    return <Loading />;
  }

  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const totalCount =
    typeof allUserData?.count === 'number' ? allUserData.count : 0;
  const pageCount = Math.ceil(totalCount / 10);

  return (
    <div>
      {allUserData?.data.map((user) => (
        <div
          key={user.user_id}
          className="flex items-center justify-start p-3  border-2 rounded-md border-custom-green-400 mx-10 my-5"
        >
          <div className="rounded-full border-2 mr-5  border-custom-green-700">
            <Image
              src={user.profile_img ?? '/profile/profile.svg'}
              alt="userProfile"
              width={100}
              height={100}
              className="rounded-full w-[100px] h-[100px]"
            />
          </div>
          <Link
            href={`blog/${user.id}`}
            className="flex flex-col text-sm space-y-5 text-black focus:outline-none"
          >
            <span> 닉네임 : {user.nickname}</span>
            <span>블로그 제목 : {user.blog_name}</span>
            <span>블로그 소개 : {user.description}</span>
          </Link>
        </div>
      ))}
      <ReactPaginate
        previousLabel={'이전'}
        nextLabel={'다음'}
        breakLabel={'...'}
        pageCount={pageCount}
        forcePage={currentPage}
        onPageChange={handlePageClick}
        containerClassName={'flex justify-center space-x-3 text-sm mt-10'}
        previousLinkClassName={'text-black focus:outline-none'}
        nextLinkClassName={'text-black   focus:outline-none '}
        pageLinkClassName={
          'text-black   focus:outline-none focus:text-custom-green-700'
        }
        breakLinkClassName={'page-link'}
        disabledLinkClassName={'focus:text-gray cursor-not-allowed'}
      />
    </div>
  );
}

export default AllBlogger;
