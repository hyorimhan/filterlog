import { myPostList } from '@/service/blog';
import { postListType } from '@/types/userBlog';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { CiImageOn } from 'react-icons/ci';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import useUserInfo from '@/zustand/useUserInfo';
import useBlogInfo from '@/zustand/useBlogInfo';

function PostList({ blog_id }: { blog_id: string }) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const user = useUserInfo((state) => state.user);
  const ownerId = useBlogInfo((state) => state.ownerId);
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
    staleTime: 0,
  });

  if (isLoading) {
    return '로딩중';
  }
  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const pageCount = Math.ceil((postList?.total || 0) / pagePost);
  const owner = ownerId === user?.id;
  return (
    <>
      {postList?.data.length === 0 ? (
        owner ? (
          <Link
            href={`/blog/write?ownerId=${ownerId}`}
            className="flex flex-col text-sm border-2 border-custom-green-700 focus:outline-none items-center justify-center h-full"
          >
            글이 아직 없어요! 첫 글을 써보세요
          </Link>
        ) : (
          <span className="text-sm flex flex-col justify-center items-center h-full">
            작성된 글이 없습니다
          </span>
        )
      ) : (
        <div className="grid grid-cols-2 gap-2 ">
          {postList?.data.map((post) => (
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
                    <span className="ml-2 flex items-center">
                      {post.img_url && (
                        <CiImageOn className="w-7 h-7 mr-5 text-custom-green-700" />
                      )}
                    </span>
                  </span>
                </div>
                <div className=" text-sm  flex items-start  justify-evenly mx-5 mt-10 text-black  ">
                  <span>
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
                  </span>
                  <span
                    className=" tracking-widest w-full  line-clamp-5"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        post.content?.replace(/<p>><\/p>/g, '') || ''
                      )
                        .replace(
                          /<img /g,
                          '<div class="flex items-center"><img class="w-52  h-36 object-cover mr-2"  '
                        )
                        .replace(/<\/img>/g, '</img></div>'),
                    }}
                  ></span>
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
