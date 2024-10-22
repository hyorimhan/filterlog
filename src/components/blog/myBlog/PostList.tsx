import { myPostList } from '@/service/blog';
import { postListType } from '@/types/userBlog';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

function PostList({ blog_id }: { blog_id: string }) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const pagePost = 10;
  const { data: postList, isLoading } = useQuery<{
    data: postListType[];
    total: number;
    limit: number;
    page: number;
  } | null>({
    queryKey: ['postList', blog_id, currentPage],
    queryFn: () =>
      myPostList({ blog_id, page: currentPage + 1, limit: pagePost }),
    enabled: !!blog_id,
  });

  if (isLoading) {
    return '로딩중';
  }
  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const pageCount = Math.ceil((postList?.total || 0) / pagePost);
  return (
    <>
      {!postList?.data ? (
        <Link href={'/blog/write'}>글이 아직 없어요! 첫 글을 써보세요</Link>
      ) : (
        <div className="grid grid-cols-2 gap-2 ">
          {postList.data.map((post) => (
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
                <div className="truncate mt-10 text-black">
                  <span className="text-sm  text-custom-green-700 ml-3 border-b-2 border-b-custom-green-300">
                    Title:
                  </span>
                  <span className="text-[16px]"> {post.title}</span>
                </div>
                <div className=" text-sm mx-5 tracking-widest mt-20 text-black line-clamp-5  ">
                  {post.content}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
      {postList && postList.data && postList.data.length > 0 && (
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
    </>
  );
}
export default PostList;
