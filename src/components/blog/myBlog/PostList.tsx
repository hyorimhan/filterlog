import { myPostList } from '@/service/blog';
import { postListType } from '@/types/userBlog';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

function PostList({ ownerId }: { ownerId: string }) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pagePost = 10;
  const { data: postList, isLoading } = useQuery<{
    data: postListType[];
    total: number;
    limit: number;
    page: number;
  } | null>({
    queryKey: ['postList', ownerId, currentPage],
    queryFn: () =>
      myPostList({ user_id: ownerId, page: currentPage, limit: pagePost }),
    enabled: !!ownerId,
  });
  // const { data: emotionData, isLoading: Loading } = useQuery({
  //   queryKey: ['emotionData', user_id],
  //   queryFn: () => existingMyEmotion({ user_id: user_id as string, blog_id }),
  //   enabled: !!user_id,
  // });
  if (isLoading) {
    return '로딩중';
  }
  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const pageCount = Math.ceil((postList?.total || 0) / pagePost);
  return (
    <>
      {!postList?.data || postList.data.length === 0 ? (
        <Link href={'/Blog/write'}>글이 아직 없어요! 첫 글을 써보세요</Link>
      ) : (
        <div className="grid grid-cols-2 gap-2 ">
          {postList.data.map((post) => (
            <div
              key={post.id}
              className="border-2 h-[290px]  border-custom-green-400 rounded-lg shadow"
            >
              <Link href={`/Blog/post/${post.id}`}>
                <div className="text-right mt-2 mr-3 text-black">
                  <span className="text-sm  border-b-2 text-custom-green-700 border-b-custom-green-300">
                    Date:
                  </span>{' '}
                  {post.created_at.slice(0, 10)}
                </div>
                <div className="truncate mt-10 text-black">
                  <span className="text-sm  text-custom-green-700 ml-3 border-b-2 border-b-custom-green-300">
                    Title:
                  </span>{' '}
                  {post.title}
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
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
          disabledClassName={'disabled'}
          previousClassName={'page-item'}
          nextClassName={'page-item'}
          pageClassName={'page-item'}
          breakClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          pageLinkClassName={'page-link'}
          breakLinkClassName={'page-link'}
        />
      )}
    </>
  );
}
export default PostList;
