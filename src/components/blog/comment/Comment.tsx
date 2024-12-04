'use client';
import { blogParams } from '@/types/userBlog';
import useUserInfo from '@/zustand/useUserInfo';
import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Loading from '@/components/common/Loading';
import {
  addComment,
  commentList,
  deleteComments,
  updateComments,
} from '@/service/comment';
import Confirm from '@/utils/Confirm';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import ReactPaginate from 'react-paginate';

interface CommentFormData {
  content: string;
  id: string;
  created_at: string;
  nickname: string;
  user_id: string;
}

function Comment({ params }: Readonly<blogParams>) {
  const { register, handleSubmit, reset } = useForm<CommentFormData>();
  const { user, nickname } = useUserInfo();

  const post_id = params.id;
  const limit = 10;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [commentRegister, setCommentRegister] = useState<boolean>(false);
  const [commentId, setCommentId] = useState<string>('');
  const [commentContent, setCommentContent] = useState<string>('');
  const queryClient = useQueryClient();

  const { data: comments, isLoading } = useQuery<{
    data: CommentFormData[];
    count: number;
    limit: number;
    page: number;
  } | null>({
    queryKey: ['comments', post_id],
    queryFn: () => commentList({ post_id, limit, page: currentPage + 1 }),
    enabled: !!post_id,
  });

  if (isLoading) {
    return <Loading />;
  }

  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const pageCount = Math.ceil((comments?.count ?? 0) / limit);

  const registerComment = async (data: CommentFormData) => {
    if (user?.id && nickname) {
      setCommentRegister(true);
      try {
        const response = await addComment({
          content: data.content,
          user_id: user?.id,
          nickname,
          post_id,
        });
        if (response) {
          toast.success(response.message);
          reset();
          queryClient.invalidateQueries({ queryKey: ['comments', post_id] });
          setCommentRegister(false);
        }
      } finally {
        setCommentRegister(false);
      }
    }
  };

  const updateComment = async () => {
    if (user?.id && nickname) {
      setCommentRegister(true);
      try {
        const response = await updateComments({
          content: commentContent,
          id: commentId,
        });
        if (response) {
          toast.success(response.message);

          queryClient.invalidateQueries({ queryKey: ['comments', post_id] });
          reset();
          setCommentId('');
          setCommentContent('');
        }
      } finally {
        setCommentRegister(false);
      }
    }
  };
  return (
    <div className="w-full text-center min-h-screen  mt-20">
      <div className="border-b text-sm ">
        <div>
          {comments?.data?.map((comment) => (
            <div
              key={comment.id}
              className="border-y-2 h-auto mt-1 w-full  border-y-custom-green-600"
            >
              {commentId === comment.id ? (
                <form onSubmit={handleSubmit(updateComment)} className="h-full">
                  <input
                    id="content"
                    type="textarea"
                    className="w-full h-full text-lg "
                    autoFocus
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                  />
                  <div className="space-x-2 py-2">
                    {' '}
                    <button
                      type="submit"
                      className="mt-5 "
                      disabled={commentRegister}
                    >
                      수정
                    </button>
                    <button
                      className="button"
                      onClick={() => {
                        setCommentContent('');
                        setCommentId('');
                      }}
                    >
                      수정 취소
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex h-24 flex-col items-start justify-center w-full">
                    <span className="ml-auto text-xs">
                      {comment.created_at.slice(0, 10)}
                    </span>
                    <div className="text-custom-green-700">
                      🍀{comment.nickname}
                    </div>
                    <div className="my-5 ml-5">{comment.content}</div>
                  </div>
                  {user?.id === comment.user_id && (
                    <div className="mb-1 gap-1 flex justify-end">
                      <button
                        onClick={() => {
                          setCommentId(comment.id);
                          setCommentContent(comment.content);
                        }}
                      >
                        수정
                      </button>
                      <button
                        onClick={() => {
                          Confirm({
                            message: '정말 댓글을 삭제하시겠습니까?',
                            onClick: async () => {
                              try {
                                const response = await deleteComments(
                                  comment.id
                                );
                                if (response) {
                                  toast.success('댓글이 삭제되었습니다');
                                  queryClient.invalidateQueries({
                                    queryKey: ['comments', post_id],
                                  });
                                } else {
                                  toast.error('삭제에 실패했습니다');
                                }
                              } catch (error) {
                                toast.error('오류가 발생했습니다');
                              }
                            },
                          });
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <Accordion>
        <AccordionItem header="댓글 작성" className="mt-5">
          <div className="border-y-2 h-40 mt-5  border-y-custom-green-600">
            <form onSubmit={handleSubmit(registerComment)} className="h-full">
              <input
                id="content"
                type="textarea"
                className="w-full h-full text-lg  "
                autoFocus
                placeholder="댓글을 작성해주세요"
                {...register('content')}
              />
              <button
                type="submit"
                className="mt-5 "
                disabled={commentRegister}
              >
                등록
              </button>
            </form>
          </div>
        </AccordionItem>
      </Accordion>

      {comments?.data && (
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

export default Comment;
