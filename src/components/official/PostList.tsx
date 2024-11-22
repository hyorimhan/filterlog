'use client';
<link rel="stylesheet" href="https://unpkg.com/xp.css"></link>;
import { allOfficialPost } from '@/service/post';
import { SelecteOfficialPostType } from '@/types/userBlog';
import useSearch from '@/zustand/useSearch';
import useUserInfo from '@/zustand/useUserInfo';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Loading from '../common/Loading';

function PostList() {
  const { user } = useUserInfo();
  const searchParams = useSearchParams();
  const { setCurrentPage, currentPage } = useSearch();
  const [selectedTab, setSelectedTab] = useState<string>(
    searchParams.get('tab') ?? 'tab-A'
  );
  const [category, setCategory] = useState<string>(
    searchParams.get('category') ?? 'magazine'
  );
  const { data: allPosts, isLoading } = useQuery<{
    data: SelecteOfficialPostType[];
    page: number;
  }>({
    queryKey: ['allPosts', category, currentPage],
    queryFn: () => allOfficialPost({ category, page: currentPage + 1 }),
  });

  if (isLoading) {
    return <Loading />;
  }
  const pageCount = Math.ceil((allPosts?.page || 0) / 10);
  const handleTabClick = (tabId: string, category: string) => {
    setSelectedTab(tabId);
    setCategory(category);
    setCurrentPage(0);
  };

  const tabs = [
    { id: 'tab-A', category: 'magazine', label: '매거진' },
    { id: 'tab-B', category: 'notice', label: '공지사항' },
    { id: 'tab-C', category: 'event', label: '이벤트' },
  ];

  const owenrId = process.env.NEXT_PUBLIC_OWNER_KEY;

  const owner = user?.id === owenrId;

  const handlePageClick = async (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className=" mt-5 mx-5">
      {owner && <Link href={'/official/write'}>글쓰기</Link>}
      <section className="tabs" style={{ maxWidth: '1280px' }}>
        <menu role="tablist" aria-label="Sample Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-controls={tab.id}
              aria-selected={selectedTab === tab.id}
              onClick={() => handleTabClick(tab.id, tab.category)}
              className="font-galmuri text-sm"
            >
              {tab.label}
            </button>
          ))}
        </menu>
        {tabs.map((tab) => (
          <article
            key={tab.id}
            role="tabpanel"
            id={tab.id}
            hidden={selectedTab !== tab.id}
          >
            <div
              className={
                category === 'notice' ? 'flex flex-col' : 'grid grid-cols-5'
              }
            >
              {allPosts?.data.map((post) => (
                <Link
                  key={post.id}
                  href={`/official/${post.id}`}
                  // className="border-2 h-72   m-2 border-custom-green-300 "

                  className={
                    category === 'notice'
                      ? 'flex items-center p-2 border-2 m-1 text-black  border-custom-green-300'
                      : 'border-2 h-80 m-1 text-black border-custom-green-300'
                  }
                >
                  <div>
                    <span>
                      {post.img_url && (
                        <Image
                          src={
                            Array.isArray(post.img_url)
                              ? post.img_url[0].trim()
                              : JSON.parse(post.img_url)[0].trim()
                          }
                          alt="postImg"
                          width={100}
                          height={100}
                          className="w-full h-48"
                        />
                      )}
                    </span>

                    <span className=" m-2 flex justify-center text-sm font-semibold">
                      {post.title}
                    </span>
                  </div>
                  {category !== 'notice' && (
                    <span className="text-center my-3 whitespace-normal line-clamp-2">
                      {post.description
                        .replace(/<\/?[^>]+(>|$)/g, '')
                        .replace(/>/g, '')}
                    </span>
                  )}
                  <span className="flex justify-end items-end  text-[11px]">
                    {post.created_at.slice(0, 10)}
                  </span>
                </Link>
              ))}
            </div>
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
          </article>
        ))}
      </section>
    </div>
  );
}

export default PostList;
