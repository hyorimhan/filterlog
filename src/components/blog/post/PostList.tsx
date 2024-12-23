import Loading from '@/components/common/Loading';
import { myPostList } from '@/service/post';
import { postListType } from '@/types/userBlog';
import useBlogInfo from '@/zustand/useBlogInfo';
import useSearch from '@/zustand/useSearch';
import useUserInfo from '@/zustand/useUserInfo';
import { useQuery } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import Fuse from 'fuse.js';
import Link from 'next/link';
import { useMemo } from 'react';
import ReactPaginate from 'react-paginate';

function PostList() {
  const {
    currentPage,
    selectedMonth,
    selectedYear,
    setCurrentPage,
    searchWord,
  } = useSearch();

  const user = useUserInfo((state) => state.user);
  const limit = 10;
  const { ownerId, blogInfo } = useBlogInfo();
  const blog_id = blogInfo?.id ?? '';

  const { data: postList, isLoading } = useQuery<{
    data: postListType[];
    total: number;
    limit: number;
    page: number;
  } | null>({
    queryKey: ['postList', blog_id, currentPage, selectedMonth, selectedYear],
    queryFn: () =>
      myPostList({
        blog_id,
        page: currentPage + 1,
        limit,
        year: selectedYear,
        month: selectedMonth,
      }),
    enabled: !!blog_id,
    staleTime: 0,
  });

  const fuseOptions = {
    keys: ['title', 'content'],
    threshold: 0.2,
    includeScore: true,
  };

  const searchResults = useMemo(() => {
    if (!postList?.data) return [];
    if (searchWord === '') return postList.data;

    const fuse = new Fuse(postList.data, fuseOptions);
    const results = fuse.search(searchWord);
    return results.map((result) => result.item);
  }, [postList?.data, searchWord]);

  if (isLoading) {
    return <Loading />;
  }

  //클릭한 페이지
  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const displayPosts = searchResults;
  const pageCount = Math.ceil((postList?.total ?? 0) / limit);
  const owner = ownerId === user?.id;

  //분리
  const NoPostMessage = () => {
    const hasNoPosts = postList?.data?.length === 0;
    const defaultResults = searchWord !== '';

    if (owner && hasNoPosts && !defaultResults) {
      return (
        <Link
          href={`/blog/write?ownerId=${ownerId}`}
          className="flex flex-col text-sm mt-10 focus:outline-none items-center justify-center h-full"
        >
          글이 아직 없어요! 첫 글을 써보세요
        </Link>
      );
    }
    if (defaultResults) {
      return <span>검색 결과가 없습니다</span>;
    }

    if (hasNoPosts && !defaultResults) {
      return (
        <span className="text-sm flex flex-col justify-center items-center h-full">
          작성된 글이 없습니다
        </span>
      );
    }

    if (hasNoPosts && !defaultResults) {
      return (
        <span className="text-sm flex flex-col justify-center items-center h-full">
          선택된 연도와 달의 글이 없습니다
        </span>
      );
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-2 ">
        {displayPosts.length === 0 ? (
          <NoPostMessage />
        ) : (
          displayPosts
            ?.slice(currentPage * limit, (currentPage + 1) * limit)
            .map((post) => (
              <div
                key={post.id}
                className="border-2 h-[290px]  border-custom-green-400 rounded-lg shadow"
              >
                <Link href={`/blog/post/${post.id}`}>
                  <div className="text-right mt-2 mr-3 text-black">
                    <span className="text-sm  border-b-2 text-custom-green-700 border-b-custom-green-300">
                      Date:
                    </span>{' '}
                    {post.created_at.slice(0, 10)}
                  </div>
                  <div className="truncate mt-10 text-black flex items-center">
                    <span className="text-sm flex text-custom-green-700 ml-3 border-b-2 border-b-custom-green-300">
                      Title:
                    </span>
                    <span className="text-[16px] flex ml-2 truncate  items-center">
                      <span className="truncate">{post.title}</span>
                    </span>
                  </div>
                  <div className=" text-sm  flex items-start  justify-evenly mx-5 mt-10 text-black  ">
                    {/* <span>
                      {post.img_url && (
                        <span>
                          <Image
                            src={
                              Array.isArray(post.img_url)
                                ? post.img_url[0].replace(/[\[\]"]/g, '')
                                : post.img_url.replace(/[\[\]"]/g, '')
                            }
                            alt="img"
                            width={200}
                            height={200}
                            className="w-52 h-36 object-cover pr-2 "
                          ></Image>
                        </span>
                      )}
                    </span> */}
                    <span
                      className=" tracking-widest w-full  line-clamp-5"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          (post.content ?? '')
                            .replace(/<p>(&gt;)*>*(&gt;)*>*<\/p>/g, '') // &gt;가 포함된 모든 형태의 >> 패턴 제거
                            .replace(/<img[^>]*>/g, '') // 이미지 태그 제거
                            .replace(/<p><\/p>/g, '') // 빈 p 태그 제거
                            .replace(/&gt;&gt;/g, '')
                        ),
                        // .replace(
                        //   /<img /g,
                        //   '<div class="flex items-center"><img class="w-52  h-36 object-cover mr-2"  '
                        // )
                        // .replace(/<\/img>/g, '</img></div>'),
                      }}
                    ></span>
                  </div>
                </Link>
              </div>
            ))
        )}
      </div>

      {displayPosts.length > 0 && (
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
      )}
    </div>
  );
}
export default PostList;
